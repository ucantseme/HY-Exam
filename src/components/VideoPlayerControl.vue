<template>
  <div class="w-full" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <div
      v-show="!isTouching"
      class="ml-3 mb-6 font-medium text-slate-50 text-base"
    >
      {{ title }}
    </div>
    <div class="w-full overflow-hidden">
      <div
        v-show="isTouching"
        class="w-full mb-3 flex justify-center items-center text-base"
      >
        <span class="text-white">{{ convertTime(props.currentTime) }}</span>
        <span class="mx-2 text-slate-400">/</span>
        <span class="text-slate-400">{{ convertTime(props.duration) }}</span>
      </div>
      <div class="w-full h-4 flex items-end" @click="handleProgressClick">
        <div
          ref="RefProgress"
          class="w-full relative flex items-center bottom-0.5 bg-gray-500/50"
          :class="isTouching ? 'h-3' : 'h-1'"
          @touchstart.prevent="handleTouchStart"
        >
          <div
            class="h-full bg-white"
            :class="{ 'opacity-70': isTouching }"
            :style="{ width: percent }"
          ></div>
          <div
            class="absolute left-0 bg-white rounded-full -translate-x-2"
            :class="btnStyle"
            :style="{ left: percent }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  duration: {
    type: Number,
    required: true,
  },
  currentTime: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
});
const emits = defineEmits([
  "selectCurrentTime",
  "slideCurrentTime",
  "playVideo",
  "pauseVideo",
]);

const convertTime = (time) => {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  const minStr = min < 10 ? `0${min}` : String(min);
  const secStr = sec < 10 ? `0${sec}` : String(sec);
  return `${minStr}:${secStr}`;
};

const isTouching = ref(false);

const getCurrentTime = (offsetX) => {
  const progressRect = RefProgress.value?.getBoundingClientRect();
  let progressPercent = offsetX / progressRect.width;
  if (progressPercent < 0) {
    progressPercent = 0;
  } else if (progressPercent > 1) {
    progressPercent = 1;
  }
  return props.duration * progressPercent;
};

const RefProgress = ref();
const handleProgressClick = (e) => {
  emits("selectCurrentTime", getCurrentTime(e.offsetX));
};
const handleTouchStart = () => {
  isTouching.value = true;
  emits("pauseVideo");
};
const handleTouchEnd = async () => {
  isTouching.value = false;
  emits("playVideo");
};
const handleTouchMove = (e) => {
  if (!isTouching.value) return;
  emits("slideCurrentTime", getCurrentTime(e.touches[0].clientX));
};
const percent = computed(() => {
  const offsetX = props.currentTime;
  return ((offsetX / props.duration) * 100).toFixed(2) + "%";
});
const btnStyle = computed(() => {
  const normal = "w-2 h-2";
  const moving = "w-2 h-4";
  return isTouching.value ? moving : normal;
});
</script>
