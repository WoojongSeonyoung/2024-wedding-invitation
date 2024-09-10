<template>
  <div class="outer">
    <main class="app">
      <router-view></router-view>
      <AudioButton />
    </main>
  </div>
</template>

<style scoped lang="postcss">
.outer {
  @apply min-h-screen bg-gray-100 flex items-center justify-center
}
.app {
  @apply w-full max-w-md bg-white p-6 rounded-lg shadow-lg
}
</style>

<script setup lang="ts">
import AudioButton from "@/components/AudioButton.vue";
</script>