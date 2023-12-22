<script setup>
defineProps({
  msg: {
    type: Object,
    required: true,
  },
});

import { useRouter } from "vue-router";
const router = useRouter();

const handleClick = (artistId) => {
  router.push("/artist/" + artistId);
};
</script>

<template>
  <div class="artist-container" @click="() => handleClick(msg.id)">
    <div class="avatar">
      <img :src="msg.images[0].url" alt="Avatar" />
    </div>
    <p>{{ msg.name }}</p>
  </div>
</template>

<style>
.artist-container {
  text-align: center;
  padding: 20px;
  max-width: 300px;
  background-color: #696969;
  border-radius: 20px;
  cursor: pointer;
}

.artist-container p {
  margin-top: 10px;
  font-weight: bold;
  font-size: 24px;
}

.avatar {
  display: block;
  width: 240px;
  height: 240px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
