<script setup>
defineProps({
  title: String,
  content: String,
})

const formatContent = (text) => {
  // 줄바꿈 문자를 <br> 태그로 변환
  return text.replace(/\r\n|\r|\n/g, '<br/>');
};
</script>

<template>
  <div class="bg-yellow-50 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-4">
    <h2 class="noto-sans-kr-regular text-xl text-gray-900 font-bold mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
      {{ title }}
    </h2>
    <p class="noto-sans-kr-regular text-md text-gray-600" v-html="formatContent(content)">
    </p>
  </div>
</template>
