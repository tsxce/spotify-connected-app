<script setup>
defineProps({
  msg: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="playlist-container">
    <img :src="msg.images[0].url" alt="" />
    <h3>{{ msg.name }}</h3>
    <p>{{ msg.tracks.total + " TRACKS" }}</p>
  </div>
</template>

<style scoped>
.playlist-container {
  width: calc(33.33% - 20px);
  padding: 20px;
  text-align: center;
}
.playlist-container img {
  width: 100%;
}
.playlist-container h3 {
  font-size: 20px;
  margin-top: 10px;
}
.playlist-container p {
  font-size: small;
  color: var(--color-grey-text);
}

@media only screen and (max-width: 600px) {
  .playlist-container {
    width: 100%;
    padding: 10px;
  }
}
</style>
