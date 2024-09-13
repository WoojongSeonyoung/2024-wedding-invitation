<template>
  <div class="bg-gray-50 p-5 rounded-lg shadow-lg max-w-md mx-auto mt-4">
    <h2 class="text-lg text-gray-950 font-bold mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
      {{ title }}
    </h2>
    <p class="text-sm text-gray-800" v-html="formatContent(content)">
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
});

const formatContent = (text) => {
  // 줄바꿈 문자를 <br> 태그로 변환
  return text.replace(/\r\n|\r|\n/g, '<br/>');
};
</script>
