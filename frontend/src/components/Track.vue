<script setup>
import millisToMinutesAndSeconds from "../utils/mstomin";
import { useRouter } from "vue-router";
defineProps({
  msg: {
    type: Object,
    required: true,
  },
  trackIndex: {
    type: Number,
    required: true,
  },
});

const router = useRouter();

const handleClick = (trackId) => {
  router.push("/track/" + trackId);
};
</script>

<template>
  <div class="track-container" @click="() => handleClick(msg.id)">
    <div class="track-detail-container">
      <p class="track-index">{{ trackIndex + 1 }}</p>
      <img :src="msg.album.images[0].url" class="user-icon" alt="profile" />
      <div>
        <p>{{ msg.name }}</p>
        <p class="artists">
          {{
            msg.artists.reduce((acc, curr, index) => {
              if (index === 0) {
                return acc + curr.name;
              } else {
                return acc + ", " + curr.name;
              }
            }, "")
          }}
        </p>
      </div>
    </div>

    <p>
      {{ millisToMinutesAndSeconds(msg.duration_ms) }}
    </p>
  </div>
</template>

<style scoped>
.track-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
}
.track-container:hover {
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}
.track-detail-container {
  display: flex;
}

.track-detail-container .artists {
  font-size: small;
  color: rgb(179, 179, 179);
}

.track-index {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.track-container img {
  display: block;
  width: 70px;
  margin-right: 30px;
}
</style>
