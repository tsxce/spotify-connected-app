<script setup>
import { ref, onMounted } from "vue";
import fetchWebApi from "../api/base";
import { apiPaths } from "../api/apiPath";
import Track from "../components/Track.vue";

const tracks = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  const response = await fetchWebApi(apiPaths.topTracks, "GET");
  console.log(response);
  if (response.error) {
    // 请求失败，做处理
    console.error("API 请求失败");
    isLoading.value = false;
  } else {
    // 请求成功
    tracks.value = response.items;
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="track-wrapper">
    <h1>Top Tracks</h1>
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
      :msg="track"
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
.track-wrapper {
  width: 100%;
  padding: 80px;
}
.track-wrapper h1 {
  font-weight: bolder;
  margin-bottom: 40px;
}

@media only screen and (max-width: 600px) {
  .track-wrapper {
    padding: 20px;
  }
  .track-wrapper h1 {
    margin-bottom: 30px;
  }
}
</style>
