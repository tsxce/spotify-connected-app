<script setup>
import SideBar from "../components/SideBar.vue";
import { ref, onMounted } from "vue";
import fetchWebApi from "../api/base";
import { apiPaths } from "../api/apiPath";
import Artist from "../components/Artist.vue";

const artists = ref([]);
const isLoading = ref(true);
console.log(artists);

onMounted(async () => {
  const response = await fetchWebApi(apiPaths.topArtists, "GET");
  console.log("top artist page: ", response);
  if (response.error) {
    // 请求失败，做处理
    console.error("API 请求失败");
    isLoading.value = false;
  } else {
    artists.value = response.items;
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="artists-wrapper">
    <h1>Top Artists</h1>
    <img
      v-if="isLoading"
      src="../assets/loading/loading-bars.svg"
      class="loading-icon"
      alt="loading"
    />
    <div class="artist-xxx" else>
      <h2 class="" v-if="artists.length == 0">No artists available</h2>
      <div class="top-container" v-else>
        <Artist :key="index" :itemName="artists[0].name" :msg="artists[0]" />
      </div>

      <div class="except-top" v-if="artists.length > 1">
        <Artist
          v-for="(artist, index) in artists.slice(1, artists.length)"
          :key="index"
          :itemName="artist.name"
          :msg="artist"
        />
      </div>
    </div>
  </div>
</template>

<style>
.artists-wrapper {
  width: 100%;
  padding: 80px;
}
.artists-wrapper h1 {
  margin-bottom: 60px;
}
.except-top {
  width: 800px;
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
}
.except-top .avatar {
  width: 120px;
  height: 120px;
}
.except-top .artist-container {
  max-width: 200px;
  margin-right: 40px;
  margin-bottom: 20px;
}
.except-top .artist-container p {
  font-size: 18px;
}
@media only screen and (max-width: 600px) {
  .artists-wrapper {
    padding: 20px;
    padding-bottom: 100px;
    text-align: center;
  }
  .artists-wrapper h1 {
    margin-bottom: 30px;
  }
  .artist-xxx {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .artist-xxx .top-container {
    display: flex;
    justify-content: center;
  }
  .except-top {
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .except-top .artist-container {
    max-width: 200px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}
</style>
