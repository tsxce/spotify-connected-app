<script setup>
import SideBar from "../components/SideBar.vue";
import { ref, onMounted } from "vue";
import fetchWebApi from "../api/base";
import { apiPaths } from "../api/apiPath";
import Track from "../components/Track.vue";

const tracks = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  const response = await fetchWebApi(apiPaths.recentPlay, "GET");
  console.log("recent: ", response);
  if (response.error) {
    // 请求失败，做处理
    console.error("API 请求失败");
    isLoading.value = false;
    // 可以根据具体情况，显示错误信息或执行其他操作
  } else {
    // 请求成功
    tracks.value = response.items;
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="recent-wrapper">
    <h1>Recent Play</h1>
    <img
      v-if="isLoading"
      src="../assets/loading/loading-bars.svg"
      class="loading-icon"
      alt="loading"
    />
    <Track
      v-for="(track, index) in tracks"
      :key="index"
      :itemName="track.name"
      :msg="track.track"
      :trackIndex="index"
      v-else
    />
  </div>
</template>

<style>
.loading-icon {
  width: 200px;
  margin: 0 auto;
}
.recent-wrapper {
  width: 100%;
  padding: 80px;
}
.recent-wrapper h1 {
  font-weight: bolder;
  margin-bottom: 40px;
}
@media only screen and (max-width: 600px) {
  .recent-wrapper {
    padding: 20px;
  }
  .recent-wrapper h1 {
    margin-bottom: 30px;
  }
}
</style>
