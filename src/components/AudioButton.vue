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
  audioPlayer.value = new Audio('https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/audio%2FMabel\'s%20Waltz.mp3?alt=media&token=aa68a7f4-bdad-403a-bd81-410db536b4f7');
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
