<template>
  <div class="w-full h-full relative flex justify-center">
    <video-player
      :src="videoInfo.play_url"
      :poster="videoInfo.cover"
      loop
      controls
      fill
    ></video-player>
    <div class="absolute left-2 bottom-8 font-medium text-slate-50">
      {{ videoInfo.title }}
    </div>
  </div>
</template>

<script setup>
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
defineProps({
  videoInfo: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
