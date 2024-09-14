<template>
  <section class="text-center my-4">
    <p class="text-xl text-black noto-serif-kr-large">
      {{ message }}
    </p>
  </section>
</template>

<script setup>
defineProps({
  message: String,
});
</script>
