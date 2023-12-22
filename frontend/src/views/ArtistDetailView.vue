<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { apiPaths } from "../api/apiPath";
import fetchWebApi from "../api/base";

const router = useRouter();
const paths = router.currentRoute.value.path.split("/");

const artistId = ref(paths[paths.length - 1]);
const artist = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  const response = await fetchWebApi(
    apiPaths.getArtist + artistId.value,
    "GET",
  );
  console.log(response);
  if (response.error) {
    // 请求失败，做处理
    console.error("API 请求失败");
    isLoading.value = false;
    // 可以根据具体情况，显示错误信息或执行其他操作
  } else {
    // 请求成功
    artist.value = response;
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="artist-detail-wrapper">
    <img
      v-if="isLoading"
      src="../assets/loading/loading-bars.svg"
      class="loading-icon"
      alt="loading"
    />
    <div class="detail-container" v-else>
      <div v-if="artist">
        <!-- <VueCarousel :images="artist.images" /> -->
        <a :href="artist.external_urls.spotify" target="_blank">
          <img :src="artist.images[0].url" alt="artist avatar" />
        </a>
        <h1>{{ artist.name }}</h1>
        <h2>{{ artist.type }}</h2>
        <h2>Followers: {{ artist.followers.total }}</h2>
        <h2>
          {{
            artist.genres.reduce((acc, curr, index) => {
              if (index === 0) {
                return acc + curr;
              } else {
                return acc + ",  " + curr;
              }
            }, "")
          }}
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  padding: 20px;
}
.detail-container img {
  width: 360px;
  margin-bottom: 20px;
}

.detail-container h1 {
  font-size: 34px;
}

.detail-container h2 {
  text-transform: uppercase;
  font-family: "Gill Sans", sans-serif;
}
</style>
