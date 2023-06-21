<template>
  <Swiper class="w-full h-full" :direction="'vertical'" @init="handleInit">
    <SwiperSlide v-for="(video, index) in videoList" :key="video.cover">
      <VideoPlayer :index="index" :videoInfo="video"></VideoPlayer>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { reactive, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useVideoStore } from "@/stores/video.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
defineComponent({ VideoPlayer });
const videoList = reactive([]);
const videoStore = useVideoStore();
const route = useRoute();
const page = route.name;
fetch("http://192.168.0.2:3000/following_list")
  .then((res) => res.json())
  .then((res) => {
    videoList.push(...res.items);
  });
const handleInit = (swiper) => {
  swiper.slideTo(videoStore.$state[page].lastIndex);
};
</script>
