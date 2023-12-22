<script setup>
import SideBar from "../components/SideBar.vue";
import { ref, onMounted } from "vue";
import fetchWebApi from "../api/base";
import { apiPaths } from "../api/apiPath";
import PlayList from "../components/PlayList.vue";

const playlists = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  const response = await fetchWebApi(apiPaths.myPlaylists, "GET");
  if (response.error) {
    // 请求失败，做处理
    console.error("API 请求失败");
    isLoading.value = false;
    // 可以根据具体情况，显示错误信息或执行其他操作
  } else {
    // 请求成功
    playlists.value = response.items;
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="playlists-wrapper">
    <h1>Your Play Lists</h1>
    <img
      v-if="isLoading"
      src="../assets/loading/loading-bars.svg"
      class="loading-icon"
      alt="loading"
    />
    <div class="lists-container" v-else>
      <PlayList
        v-for="(playlist, index) in playlists"
        :key="index"
        :itemName="playlist.name"
        :msg="playlist"
        :trackIndex="index"
      />
    </div>
  </div>
</template>

<style>
.loading-icon {
  width: 200px;
  margin: 0 auto;
}
.playlists-wrapper {
  width: 100%;
  padding: 80px;
}
.playlists-wrapper h1 {
  font-weight: bolder;
  margin-bottom: 40px;
}
.lists-container {
  display: flex;
}
@media only screen and (max-width: 600px) {
  .playlists-wrapper {
    padding: 20px;
    padding-bottom: 100px;
  }
  .lists-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
