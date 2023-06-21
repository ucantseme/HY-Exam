<template>
  <div
    class="w-full h-full relative flex justify-center"
    @touchstart.stop="controlVideo"
  >
    <video-player
      :src="videoInfo.play_url"
      :poster="videoInfo.cover"
      :options="playOptions"
      @touchmove.prevent
      @mounted="handleMounted"
    >
      <template v-slot="{ state }">
        <img
          v-show="!state.playing"
          class="block absolute top-0 left-0 right-0 bottom-0 m-auto z-10 w-9"
          src="@/assets/play.svg"
          alt="Play"
        />
        <VideoPlayerControl
          class="absolute bottom-0"
          :current-time="state.currentTime"
          :duration="state.duration"
          :title="videoInfo.title"
          @selectCurrentTime="selectCurrentTime"
          @slideCurrentTime="updateCurrentTime"
          @playVideo="playVideo"
          @pauseVideo="pauseVideo"
        ></VideoPlayerControl>
      </template>
    </video-player>
  </div>
</template>

<script setup>
import { shallowRef, watch, ref } from "vue";
import { useSwiperSlide } from "swiper/vue";
import { VideoPlayer } from "@videojs-player/vue";
import VideoPlayerControl from "./VideoPlayerControl.vue";
import "video.js/dist/video-js.css";
const props = defineProps({
  videoInfo: {
    type: Object,
    required: true,
  },
});
const playOptions = {
  loop: true,
  playsinline: true,
  fill: true,
  preload: "auto",
  language: "zh-TW",
};
const player = shallowRef();
const state = shallowRef();
const swiperSlide = useSwiperSlide();
const handleMounted = (payload) => {
  player.value = payload.player;
  state.value = payload.state;
};
const updateCurrentTime = (currentTime) => {
  player.value?.currentTime(currentTime);
};
const playVideo = () => {
  player.value?.play();
};
const pauseVideo = () => {
  player.value?.pause();
};
const selectCurrentTime = (currentTime) => {
  updateCurrentTime(currentTime);
  playVideo();
};
const controlVideo = () => {
  const playing = state.value.playing;
  player.value[playing ? "pause" : "play"]();
};
watch(swiperSlide, (val) => {
  if (val.isActive) {
    player.value?.play();
  } else {
    player.value?.pause();
    player.value?.currentTime(0);
  }
});
</script>
