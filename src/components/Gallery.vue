<template>
  <div class="gallery-container grid grid-cols-3 gap-3">
    <div v-for="(image, index) in images" :key="index" :class="image.wrapperClass">
      <div :class="image.sizeClass">
        <img @click="openModal(image.src)" :src="getSrc(image.src)" :alt="image.alt" class="image-container"/>
      </div>
    </div>
  </div>
  <div v-if="isModalOpen" @click="closeModal"
       class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <SnowFlakes icon="snow"/>
    <div class="relative" @click.stop>
      <img :src="getSrc(selectedImage)" alt="Enlarged Image" class="w-full max-w-3xl h-auto rounded-lg"/>
      <button @click="closeModal" class="absolute top-2 right-2 text-white text-xl">
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
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
const selectedImage = ref('');
const openModal = (imageSrc) => {
  selectedImage.value = imageSrc;
  isModalOpen.value = true;
};

const globImage = import.meta.glob('../assets/*.{jpeg,png,svg,jpg}', {eager: true});
const getSrc = (imageSrc) => {
  if (imageSrc.startsWith('http')) {
    return imageSrc;
  }
  return globImage[`../assets/${imageSrc}`]?.default || '';
}

const closeModal = () => {
  isModalOpen.value = false;
};
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

</style>
