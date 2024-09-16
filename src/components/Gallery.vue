<template>
  <div class="gallery-container grid grid-cols-3 gap-3">
    <div v-for="(image, index) in images" :key="index" :class="image.wrapperClass">
      <div :class="image.sizeClass">
        <img @click="openModal(index)" :src="getSrc(image.src)" :alt="image.alt" class="image-container"/>
      </div>
    </div>
  </div>
  <div v-if="isModalOpen" @click="closeModal"
       class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <SnowFlakes icon="snow"/>
    <div class="relative overflow-hidden w-full max-w-3xl h-auto"
         @mousedown="startDrag"
         @mousemove="onDrag"
         @mouseup="endDrag"
         @mouseleave="endDrag"
         @touchstart="startDrag"
         @touchmove="onDrag"
         @touchend="endDrag"
         @click.stop
    >
      <div class="slider-container relative overflow-hidden w-full max-w-3xl h-auto" @click.stop>
        <div class="image-slider"
             :style="{ transform: `translateX(${translateX}px)`, transition: isDragging ? 'none' : 'transform 0.5s ease' }">
          <img v-for="(image, index) in images" :key="index" :src="getSrc(image.src)" :alt="image.alt"
               class="image-item"/>
        </div>
      </div>
      <!-- 인덱스 표시하는 dot들 -->
      <div class="dots mt-4">
      <span
          v-for="index in images.length"
          :key="index - 1"
          @click="goToSlide(index - 1)"
          :class="{ active: index - 1 === selectedImageIndex }"
          class="dot"
      ></span>
      </div>
      <button @click="closeModal" class="absolute top-2 right-2 text-white text-xl">
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import SnowFlakes from "@/components/SnowFlakes.vue";

const images = [
  { src: 'https://placehold.co/600x400', alt: 'Gallery Image 1', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100' },
  { src: 'https://placehold.co/400x600', alt: 'Gallery Image 2', wrapperClass: 'vertical-wrapper', sizeClass: 'image-wrapper-50' },
  { src: 'https://placehold.co/600x400', alt: 'Gallery Image 3', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100' },
  { src: 'https://placehold.co/600x400', alt: 'Gallery Image 4', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100' },
  { src: 'https://placehold.co/600x400', alt: 'Gallery Image 5', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100' },
  { src: 'https://placehold.co/400x600', alt: 'Gallery Image 6', wrapperClass: 'vertical-wrapper', sizeClass: 'image-wrapper-50' },
  { src: 'https://placehold.co/600x400', alt: 'Gallery Image 7', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100' }
];

const isModalOpen = ref(false);
const selectedImageIndex = ref(0);
const translateX = ref(0);
const startX = ref(0);
const currentX = ref(0);
const isDragging = ref(false);

const openModal = (index) => {
  selectedImageIndex.value = index;
  translateX.value = -index * window.innerWidth;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// 드래그 시작
const startDrag = (event) => {
  isDragging.value = true;
  startX.value = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
  currentX.value = translateX.value;
};

// 드래그 중
const onDrag = (event) => {
  if (!isDragging.value) return;
  const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
  const diff = clientX - startX.value;
  translateX.value = currentX.value + diff;
};

// 드래그 종료
const endDrag = () => {
  isDragging.value = false;
  const diff = translateX.value - currentX.value;

  if (diff > 100 && selectedImageIndex.value > 0) {
    selectedImageIndex.value--;  // 이전 이미지로 이동
  } else if (diff < -100 && selectedImageIndex.value < images.length - 1) {
    selectedImageIndex.value++;  // 다음 이미지로 이동
  }

  // 드래그 종료 후 슬라이더 위치 업데이트
  translateX.value = -selectedImageIndex.value * window.innerWidth;
  isDragging.value = false;
};

// dot 클릭 시 해당 이미지로 이동
const goToSlide = (index) => {
  selectedImageIndex.value = index;
  translateX.value = -index * window.innerWidth;
};

const globImage = import.meta.glob('../assets/*.{jpeg,png,svg,jpg}', {eager: true});
const getSrc = (imageSrc) => {
  if (imageSrc.startsWith('http')) {
    return imageSrc;
  }
  return globImage[`../assets/${imageSrc}`]?.default || '';
}
</script>

<style scoped lang="postcss">
.vertical-wrapper {
  @apply col-span-2 row-span-1
}

.horizontal-wrapper {
  @apply col-span-1 row-span-1
}

.image-wrapper-50 {
  @apply relative w-full pt-[50%] overflow-hidden;
}

.image-wrapper-100 {
  @apply relative w-full pt-[100%] overflow-hidden;
}

.image-container {
  @apply absolute top-0 left-0 w-full h-full object-cover rounded-lg;
}

/* 슬라이더 컨테이너 */
.slider-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

/* 이미지 슬라이더 */
.image-slider {
  display: flex;
  width: 100%;
  height: auto;
  transition: transform 0.5s ease;
}

/* 슬라이드 이미지 */
.image-item {
  min-width: 100%;
  height: auto;
}

/* dot 스타일 */
.dots {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.dot {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background-color: rgba(255, 255, 255, 1);
}
</style>
