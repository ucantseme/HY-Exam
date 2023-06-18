<template>
  <div class="w-full h-full relative flex justify-center">
    <video-player
      id="videoPlayer"
      ref="RefVideoPlayer"
      :src="videoInfo.play_url"
      :poster="videoInfo.cover"
      loop
      fill
      @touchmove.prevent
      @mounted="handleMounted"
    ></video-player>
    <div class="absolute left-2 bottom-8 font-medium text-slate-50">
      {{ videoInfo.title }}
    </div>
  </div>
</template>

<script setup>
import { shallowRef, watch } from "vue";
import { useSwiperSlide } from "swiper/vue";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
const props = defineProps({
  videoInfo: {
    type: Object,
    required: true,
  },
});
const player = shallowRef();
const swiperSlide = useSwiperSlide();
const handleMounted = (payload) => {
  player.value = payload.player;
};
watch(swiperSlide, async (val) => {
  if (val.isActive) {
    player.value?.play();
  } else {
    player.value?.pause();
    player.value?.currentTime(0);
  }
});
</script>

<style lang="scss" scoped></style>
