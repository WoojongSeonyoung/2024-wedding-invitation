<template>
  <section class="mt-4 mb-2 text-center">
    <p class="kumar-one-regular text-xl text-emerald-950">
      2024.11.16
    </p>
  </section>
  <section class="image-wrapper">
    <div v-if="isLoading" class="skeleton-loader absolute inset-0"></div>

    <!-- 실제 이미지 -->
    <img
        :src="imageSrc"
        alt="mainImage"
        class="image-container"
        :class="{ 'visible': !isLoading }"
        @load="onImageLoad"
        @error="onImageError"
    />
  </section>
  <section class="mt-8 text-center text-lg">
    <p class="poor-story-regular text-xl">
      김우종 ❤️ 김선영
    </p>
    <br/>
    <p class="poor-story-regular">
      2024년 11월 16일 토요일 오전 11시
    </p>
    <p class="poor-story-regular">
      충주컨벤션센터 웨딩홀 5층 그랜드볼룸홀
    </p>
  </section>
</template>

<script setup>
import {ref} from 'vue';

const isLoading = ref(true);
const imageSrc = "https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FfirstPhoto.avif?alt=media&token=10a8a5c4-8fcb-46c1-89ec-f39d895d3dbf";

const onImageLoad = () => {
  isLoading.value = false;
};

const onImageError = () => {
  console.error("이미지를 로드하는 중 오류가 발생했습니다.");
  isLoading.value = false;
};
</script>

<style scoped lang="postcss">
.image-wrapper {
  @apply w-full relative;
  aspect-ratio: auto 2230 / 3454;
}

.image-container {
  @apply w-full h-full opacity-0 transition-opacity duration-500 ease-in-out;
}

.image-container.visible {
  @apply opacity-100;
}

/* 스켈레톤 로딩 애니메이션 */
.skeleton-loader {
  @apply w-full h-full bg-gray-300;
  animation: skeleton-loading 1.2s ease-in-out infinite;
  position: absolute;
  top: 0;
  left: 0;
}

/* 스켈레톤 애니메이션 */
@keyframes skeleton-loading {
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
}
</style>
