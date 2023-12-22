<script setup>
defineProps({
  trackId: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <a :href="`https://open.spotify.com/track/${trackId}`" target="_blank">
    <button>Play on Spotify</button>
  </a>
</template>

<style scoped>
button {
  display: inline-block;
  background-color: rgb(29, 185, 84);
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 50px;
  border-color: aliceblue;
  padding: 11px 24px;
  margin: 20px 0px;
  cursor: pointer;
}
</style>
