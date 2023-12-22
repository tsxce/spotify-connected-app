<template>
  <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
    <!-- <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">{{ slide }}</div>
      </Slide> -->

    <!-- <slide
      :itemsToShow="3.95"
      :wrapAround="true"
      :transition="500"
      v-for="(artistImg, index) in images"
      :key="index"
      :itemName="index"
    >
      <img :src="artistImg.url" alt="" />
    </slide> -->

    <!-- <slide>
      <img :src="images.url" alt="" />
    </slide> -->

    <!-- <Slide>
      <div class="carousel__item">
        <img :src="images[0].url" alt="" />
        <img src="https://i.scdn.co/image/ab6761610000e5eb44cc73a57e7a317ee89158d4" alt="">
      </div>
    </Slide> -->

    <slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </slide>
  </Carousel>
  <Pagination />
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "Autoplay",
  props: {
    images: Array,
  },
  components: {
    Carousel,
    Slide,
    Pagination,
  },
});
</script>

<style scoped>
img {
  width: 500px;
}

.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 800px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>
