<template>
  <button
      @click="toggleMusic"
      class="fixed top-0 right-0 p-4 rounded-full"
      :aria-label="isPlaying ? '음악 멈추기' : '음악 재생하기'"
  >
    <MusicalNoteIcon
        :class="[
        'w-6 h-6',
        isPlaying ? 'text-rose-300 animate-bounce' : 'text-gray-400',
      ]"
    />
  </button>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {MusicalNoteIcon} from '@heroicons/vue/24/outline/index.js';

const audioPlayer = ref(null);
const isPlaying = ref(false);

const toggleMusic = () => {
  if (audioPlayer.value) {
    if (isPlaying.value) {
      audioPlayer.value.pause();
      isPlaying.value = false;
    } else {
      audioPlayer.value.play();
      isPlaying.value = true;
    }
  } else {
    initMusic();
  }
};

const initMusic = () => {
  audioPlayer.value = new Audio('https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/audio%2F(AR)%20%E1%84%87%E1%85%A7%E1%86%AB%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A5%E1%86%B8%20STUDIO%20X%20U%20-%20%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%87%E1%85%A7%E1%86%A8%20%E1%84%80%E1%85%B3%20%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%A6%20(Feat.%20%E1%84%8B%E1%85%B5%E1%84%8E%E1%85%A2%E1%84%87%E1%85%B5%E1%86%AB).mp3?alt=media&token=f97dd339-9ca9-40a4-8d6c-3dcc898ca409');
  audioPlayer.value.loop = true;
  audioPlayer.value.volume = 1;
  audioPlayer.value.play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch((error) => {
        console.error('오디오 재생 실패:', error);
      });
}

onMounted(() => {
  initMusic();
});
</script>
