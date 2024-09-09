<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-center mb-4">{{ msg }}</h1>
    <p class="text-gray-600 text-center">Join us on our special day!</p>
    <button class="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-4">
      결혼을 축하해주세요!
    </button>
  </div>
</template>

<style scoped>
</style>
