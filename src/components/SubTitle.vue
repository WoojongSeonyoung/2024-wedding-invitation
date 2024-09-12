<script setup>
defineProps({
  message: String,
})
</script>

<template>
  <section class="text-center">
    <p class="text-xl text-black noto-serif-kr-large">
      {{ message }}
    </p>
  </section>
</template>
