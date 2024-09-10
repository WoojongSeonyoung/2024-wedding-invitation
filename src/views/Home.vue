<script setup>
import {onMounted, ref} from 'vue'
import Footer from "@/components/Footer.vue";
import KakaoMap from "@/components/KakaoMap.vue";

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <main>
    <h1 class="hello">안녕하세요</h1>
    <p class="text-gray-600 text-center">Join us on our special day!</p>
    <button class="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-4">
      결혼을 축하해주세요!
    </button>
    <KakaoMap />
    <Footer/>
  </main>
</template>

<style scoped lang="postcss">
.hello {
  @apply text-2xl font-bold text-center mb-4
}

</style>
