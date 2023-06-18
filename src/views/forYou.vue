<template>
  <VideoPlayer
    v-for="video in videoList"
    :key="video.cover"
    :videoInfo="video"
  ></VideoPlayer>
</template>

<script setup>
import { reactive, defineComponent } from "vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
defineComponent({ VideoPlayer });
const videoList = reactive([]);
fetch("http://192.168.0.5:3000/for_you_list")
  .then((res) => res.json())
  .then((res) => {
    videoList.push(...res.items);
  });
</script>

<style lang="scss" scoped></style>
