<template>
  <div class="relative w-full h-full overflow-hidden">
    <nav class="absolute top-8 w-full z-10 flex justify-center">
      <router-link
        to="/following"
        class="inline-block text-slate-400 pb-1 px-4 text-sm font-medium text-center border-transparent border-b-2"
      >
        關注中
      </router-link>
      <router-link
        to="/for-you"
        class="inline-block text-slate-400 pb-1 px-4 text-sm font-medium text-center border-transparent border-b-2"
      >
        為您推薦
      </router-link>
    </nav>
    <div class="w-full h-full overflow-auto scroll-smooth">
      <router-view />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.router-link-active {
  color: #fff;
  border-bottom-color: #fff;
}
</style>
