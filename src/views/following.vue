<template>
  <Swiper class="w-full h-full" :direction="'vertical'">
    <SwiperSlide v-for="video in videoList" :key="video.cover">
      <VideoPlayer :videoInfo="video"></VideoPlayer>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { reactive, defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
defineComponent({ VideoPlayer });
const videoList = reactive([]);
fetch("http://192.168.0.2:3000/following_list")
  .then((res) => res.json())
  .then((res) => {
    videoList.push(...res.items);
  });
</script>
