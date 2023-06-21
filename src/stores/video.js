import { defineStore, acceptHMRUpdate } from 'pinia'

export const useVideoStore = defineStore('video', {
  state: () => ({
    following: {
      lastIndex: 0,
      lastCurrentTime: 0
    },
    forYou: {
      lastIndex: 0,
      lastCurrentTime: 0
    }
  }),
  actions: {
    setLastIndex(page, index) {
      this[page].lastIndex = index
    },
    setLastCurrentTime(page, currentTime) {
      this[page].lastCurrentTime = currentTime
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVideoStore, import.meta.hot))
}