<template>
  <section class="text-center my-4">
    <p class="text-xl text-emerald-950">
      {{ message }}
    </p>
  </section>
</template>

<script setup>
defineProps({
  message: String,
});
</script>
