<template>
  <div
    class="w-full h-full relative flex justify-center"
    @touchmove.prevent="handleTouchMove"
    @touchend.prevent="handleTouchEnd"
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
import { ref, shallowRef, watch, onBeforeUnmount, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSwiperSlide } from "swiper/vue";
import VideoPlayerControl from "./VideoPlayerControl.vue";
import { useVideoStore } from "@/stores/video.js";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
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
const videoStore = useVideoStore();
const route = useRoute();
const page = route.name;
const isMoving = ref(true);
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
const handleTouchMove = () => {
  if (isMoving.value) return;
  player.value.hasStarted(false);
  isMoving.value = true;
};
const handleTouchEnd = () => {
  player.value.hasStarted(true);
  const playing = state.value.playing;
  if (isMoving.value && swiperSlide.value.isActive) {
    playVideo();
  } else {
    player.value[playing ? "pause" : "play"]();
  }
  isMoving.value = false;
};
watch(swiperSlide, (val) => {
  if (val.isActive) {
    player.value?.play();
    videoStore.setLastIndex(page, props.index);
  } else {
    player.value?.pause();
    player.value?.currentTime(0);
  }
});
onMounted(() => {
  if (props.index === videoStore.$state[page].lastIndex) {
    updateCurrentTime(videoStore.$state[page].lastCurrentTime);
    player.value?.pause();
  }
});
onBeforeUnmount(() => {
  if (props.index === videoStore.$state[page].lastIndex) {
    videoStore.setLastCurrentTime(page, state.value.currentTime);
  }
});
defineExpose({ updateCurrentTime, playVideo });
</script>
