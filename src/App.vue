<template>
  <div class="outer">
    <main class="app relative">
      <CinemaNoise />
      <SnowFlakes />
      <router-view></router-view>
      <AudioButton />
    </main>
  </div>
</template>

<script setup>
import AudioButton from '@/components/AudioButton.vue';
import SnowFlakes from '@/components/SnowFlakes.vue';
import CinemaNoise from '@/components/CinemaNoise.vue';

</script>

<style scoped lang="postcss">
.outer {
  @apply min-h-screen bg-gray-100 flex items-center justify-center
}

.app {
  @apply w-full max-w-md bg-white p-6 rounded-lg shadow-lg relative overflow-hidden
}
</style>
