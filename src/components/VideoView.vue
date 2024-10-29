<template>
  <section class="max-w-3xl mx-auto my-8">
    <div class="relative">
      <video
          ref="videoPlayer"
          class="w-full rounded-tl-lg rounded-tr-lg shadow-lg"
          @click="togglePlay"
      >
        <source src="https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/video%2F%E1%84%80%E1%85%B5%E1%86%B7%E1%84%8B%E1%85%AE%E1%84%8C%E1%85%A9%E1%86%BC%20%E1%84%80%E1%85%B5%E1%86%B7%E1%84%89%E1%85%A5%E1%86%AB%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%82%E1%85%B5%E1%86%B7.mp4?alt=media&token=e91aa501-2ea7-4a0f-926f-349a73549ce6" type="video/mp4">
        Your browser does not support the video tag.
      </video>

      <div class="bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-bl-lg rounded-br-lg shadow-lg">
        <div class="flex items-center justify-between">
          <button @click="togglePlay" class="focus:outline-none">
            {{ isPlaying ? '⏸️ Pause' : '▶️ Play' }}
          </button>
          <input
              type="range"
              min="0"
              :max="duration"
              v-model="currentTime"
              @input="seek"
              class="w-1/2"
          >
          <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const videoPlayer = ref(null);
const isPlaying = ref(false);
const duration = ref(0);
const currentTime = ref(0);

const togglePlay = () => {
  if (videoPlayer.value.paused) {
    videoPlayer.value.play();
    isPlaying.value = true;
  } else {
    videoPlayer.value.pause();
    isPlaying.value = false;
  }
};

const seek = () => {
  videoPlayer.value.currentTime = currentTime.value;
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

onMounted(() => {
  videoPlayer.value.addEventListener('loadedmetadata', () => {
    duration.value = videoPlayer.value.duration;
  });

  videoPlayer.value.addEventListener('timeupdate', () => {
    currentTime.value = videoPlayer.value.currentTime;
  });
});

watch(isPlaying, (newValue) => {
  if (newValue) {
    videoPlayer.value.play();
  } else {
    videoPlayer.value.pause();
  }
});
</script>

<style scoped lang="postcss">
</style>