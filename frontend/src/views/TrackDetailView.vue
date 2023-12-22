<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { apiPaths } from "../api/apiPath";
import fetchWebApi from "../api/base";
import BarChart from "../components/BarChart.vue";
import PlayOnSpotifyBtn from "../components/PlayOnSpotifyBtn.vue";

const router = useRouter();
const paths = router.currentRoute.value.path.split("/");

const trackId = ref(paths[paths.length - 1]);
const isLoading = ref(true);
const trackDetail = ref(null);
const trackAudioFeature = ref(null);

onMounted(async () => {
  const promise1 = fetchWebApi(apiPaths.getTrack + trackId.value, "GET").then(
    (response) => {
      console.log(response);
      if (response.error) {
        console.error("API 请求失败");
      } else {
        trackDetail.value = response;
      }
    },
  );

  const promise2 = fetchWebApi(
    apiPaths.getTrackFeature + trackId.value,
    "GET",
  ).then((response) => {
    console.log("response2: ", response);
    if (response.error) {
      console.error("API 请求失败");
    } else {
      trackAudioFeature.value = response;
    }
  });

  Promise.all([promise1, promise2])
    .then(() => {
      isLoading.value = false;
      console.log("两个异步方法执行完成");
    })
    .catch((error) => {
      isLoading.value = false;
      console.error("Promise.all错误: ", error);
    });
});
</script>

<template>
  <div class="track-detail-wrapper">
    <img
      v-if="isLoading"
      src="../assets/loading/loading-bars.svg"
      class="loading-icon"
      alt="loading"
    />
    <div class="info-wrapper" v-else>
      <div class="base-info-wrapper">
        <img
          :src="trackDetail && trackDetail.album.images[0].url"
          class="album-cover"
          alt="album cover"
        />
        <div class="title-container">
          <h2>{{ trackDetail && trackDetail.name }}</h2>
          <h3>{{ trackDetail && trackDetail.artists[0].name }}</h3>
          <h4>{{ trackDetail && trackDetail.album.name }}</h4>
          <PlayOnSpotifyBtn :trackId="trackId" />
        </div>
      </div>
      <div v-if="trackAudioFeature" class="audio-feature">
        <BarChart :audioData="trackAudioFeature" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.track-detail-wrapper {
  width: 100%;
  padding: 80px;
}
.base-info-wrapper img {
  width: 250px;
  height: 250px;
}
.base-info-wrapper {
  display: flex;
}
.base-info-wrapper .title-container {
  margin-left: 50px;
}
.base-info-wrapper .title-container h2 {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 8px;
}
.base-info-wrapper .title-container h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
.base-info-wrapper .title-container h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
.audio-feature {
  margin-top: 80px;
}

@media only screen and (max-width: 600px) {
  .track-detail-wrapper {
    padding: 20px;
    padding-bottom: 100px;
  }
  .trac-detailk-wrapper h1 {
    margin-bottom: 30px;
  }
  .base-info-wrapper {
    display: block;
  }
  .base-info-wrapper img {
    width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .audio-feature {
    margin-top: 30px;
  }

  .audio-feature #my-chart-id {
    width: 100%;
  }
}
</style>
