<template>
  <div
    class="w-full overflow-hidden"
    @touchmove.stop="handleTouchMove"
    @touchend.stop="handleTouchEnd"
  >
    <div class="w-full bottom-8 flex justify-center items-center">
      <span class="text-white">00:00</span>
      <span class="mx-2 text-slate-400">/</span>
      <span class="text-slate-400">01:00</span>
    </div>
    <div class="w-full h-4 flex items-end">
      <div
        ref="RefProgress"
        class="w-full relative flex items-center bottom-0 bg-gray-500/50"
        :class="isTouching ? 'h-3' : 'h-1'"
        @click="handleProgressClick"
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
          @touchstart.prevent.stop="handleTouchStart"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, toRefs, nextTick } from "vue";
const props = defineProps({
  duration: {
    type: Number,
    default: 0,
  },
  currentTime: {
    type: Number,
    default: 0,
  },
});
const emits = defineEmits(["update:currentTime"]);
const duration = toRefs(props).duration;
const currentTime = toRefs(props).currentTime;
const isTouching = ref(false);
const draggedCurrentTime = ref(0);
const RefProgress = ref();

const getCurrentTime = (offsetX) => {
  const progressRect = RefProgress.value?.getBoundingClientRect();
  let progressPercent = offsetX / progressRect.width;
  if (progressPercent < 0) {
    progressPercent = 0;
  } else if (progressPercent > 1) {
    progressPercent = 1;
  }
  return duration.value * progressPercent;
};
const setProgress = (offsetX) => {
  const newCurrentTime = getCurrentTime(offsetX);
  emits("update:currentTime", newCurrentTime);
};
const handleProgressClick = (e) => {
  setProgress(e.offsetX);
};
const handleTouchStart = (e) => {
  isTouching.value = true;
  draggedCurrentTime.value = getCurrentTime(e.touches[0].clientX);
};
const handleTouchEnd = async () => {
  emits("update:currentTime", draggedCurrentTime.value);
  isTouching.value = false;
  draggedCurrentTime.value = 0;
};
const handleTouchMove = (e) => {
  if (!isTouching.value) return;
  draggedCurrentTime.value = getCurrentTime(e.touches[0].clientX);
};
const percent = computed(() => {
  const offsetX = isTouching.value
    ? draggedCurrentTime.value
    : currentTime.value;
  return ((offsetX / duration.value) * 100).toFixed(2) + "%";
});
const btnStyle = computed(() => {
  const normal = "w-2 h-2";
  const moving = "w-2 h-4";
  return isTouching.value ? moving : normal;
});
</script>
