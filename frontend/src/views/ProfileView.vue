<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import fetchWebApi from "../api/base";
import { apiPaths } from "../api/apiPath";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import RecentListView from "./RecentListView.vue";
import TopTracksView from "./TopTracksView.vue";
import PieChart from "../components/PieChart.vue";
import RadarChart from "../components/RadarChart.vue";

import MyWorker from "@/utils/worker.js?worker";

import {
  isLocalDataAvailable,
  saveDataLocalStorageWithExpireData,
} from "../utils/dataLocalStorageWithExpire";

const worker = new MyWorker();
const store = useStore();
const userProfile = ref(null);
const playLists = ref(null);

const router = useRouter();
const isLoading = ref(true); //这个ref不能放在onMounted里面，因为onMounted是所有dom加载后才执行。如果放在里面会看不到loading的效果。
const isRecentWorkerLoading = ref(true);
const isTopWorkerLoading = ref(true);
const topTrackAnalysisData = ref(null);
const recentTrackAnalysisData = ref(null);

const handleRecentSeeMoreClick = () => {
  store.commit("setClickedIndex", 3);
  router.push("recentlist");
};

const handleTopSeeMoreClick = () => {
  store.commit("setClickedIndex", 2);
  router.push("toptracks");
};

onMounted(async () => {
  if (
    isLocalDataAvailable("recentTrackAnalysisData") ||
    isLocalDataAvailable("topTrackAnalysisData")
  ) {
    topTrackAnalysisData.value = JSON.parse(
      localStorage.getItem("topTrackAnalysisData"),
    );
    isTopWorkerLoading.value = false;
    recentTrackAnalysisData.value = JSON.parse(
      localStorage.getItem("recentTrackAnalysisData"),
    );
    isRecentWorkerLoading.value = false;
  } else {
    worker.postMessage({
      type: "token",
      payload: localStorage.getItem("token_spotify"),
    });
  }

  worker.onmessage = (event) => {
    const message = event.data;
    if (message.type === "recent success") {
      console.log("receive recent  msg from worker: ", message);
      saveDataLocalStorageWithExpireData(
        "recentTrackAnalysisData",
        message.payload,
      );
      recentTrackAnalysisData.value = message.payload;
      isRecentWorkerLoading.value = false;
    } else if (message.type === "top success") {
      console.log("receive top msg from worker: ", message);
      saveDataLocalStorageWithExpireData(
        "topTrackAnalysisData",
        message.payload,
      );
      topTrackAnalysisData.value = message.payload;
      isTopWorkerLoading.value = false;
    }
  };

  const response = await fetchWebApi(apiPaths.user, "GET");
  if (response.error) {
    // 请求失败，做处理
    console.error("API 请求失败");
    isLoading.value = false;
    // 可以根据具体情况，显示错误信息或执行其他操作
  } else {
    // 请求成功
    userProfile.value = response;
  }

  const responsePlaylist = await fetchWebApi(apiPaths.myPlaylists, "GET");
  if (responsePlaylist.error) {
    // 请求失败，做处理
    console.error("API 请求失败");
    isLoading.value = false;
    // 可以根据具体情况，显示错误信息或执行其他操作
  } else {
    // 请求成功
    playLists.value = responsePlaylist.items.length;
    isLoading.value = false;
  }
});

//在组件卸载时终止Worker
onBeforeUnmount(() => {
  worker.terminate();
});
</script>

<template>
  <div class="profile-wrapper">
    <img
      v-if="isLoading"
      src="../assets/loading/loading-bars.svg"
      class="loading-icon"
      alt="loading"
    />

    <div class="profile-container" v-else>
      <div class="">
        <img src="../assets/user-circle.svg" class="user-icon" alt="profile" />
      </div>
      <h1>{{ userProfile && userProfile.display_name }}</h1>
      <div class="profile-detail-wrapper">
        <div class="info follower">
          <p>{{ userProfile && userProfile.followers.total }}</p>
          <p>FOLLOWERS</p>
        </div>
        <div class="info following">
          <p>-</p>
          <p>FOLLOWING</p>
        </div>
        <div class="info playlist">
          <p>{{ playLists || "-" }}</p>
          <p>PLAYLISTS</p>
        </div>
      </div>
    </div>
    <div class="list-container">
      <div class="list-wrapper">
        <button class="see-more-btn" @click="handleRecentSeeMoreClick">
          See More
        </button>
        <RecentListView />
      </div>
      <div class="analysis">
        <p v-if="isRecentWorkerLoading">Data processing...</p>
        <RadarChart :audioData="recentTrackAnalysisData.value" v-else />
      </div>
    </div>
    <div class="list-container">
      <div class="list-wrapper">
        <button class="see-more-btn" @click="handleTopSeeMoreClick">
          See More
        </button>
        <TopTracksView />
      </div>
      <div class="analysis">
        <p v-if="isTopWorkerLoading">Data processing...</p>
        <PieChart :audioData="topTrackAnalysisData.value" v-else />
      </div>
    </div>
  </div>
</template>

<style>
.profile-wrapper {
  padding: 80px;
  width: 100%;
}
.profile-container {
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.profile-container .user-icon {
  width: 150px;
  height: 150px;
}
.profile-container h1 {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
}
.profile-detail-wrapper {
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.list-container {
  display: flex;
  margin-top: 70px;
}
.list-container .list-wrapper {
  position: relative;
  width: 50%;
  height: 400px;
  overflow: hidden;
}
.list-wrapper .see-more-btn {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  background-color: rgb(29, 185, 84);
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 50px;
  border-color: black;
  padding: 3px 10px;
  margin: 20px 0px;
  cursor: pointer;
}
.list-container .recent-wrapper {
  padding: 0;
}
.list-container .analysis {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-container .track-wrapper {
  padding: 0;
}
@media only screen and (max-width: 600px) {
  .profile-wrapper {
    padding: 20px;
    padding-bottom: 80px;
    width: 100%;
  }
  .profile-detail-wrapper {
    width: 100%;
    margin-bottom: 40px;
  }
  .list-container {
    display: block;
    margin-top: 0;
  }
  .list-container .list-wrapper {
    width: 100%;
  }
  .list-container .analysis {
    width: 100%;
    margin-top: 40px;
  }
  #polar-chart {
    width: 100%;
  }
}
</style>
