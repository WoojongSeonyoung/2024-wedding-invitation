<template>
    <div class="gallery-container grid grid-cols-3 gap-3">
      <div v-for="(image, index) in images" :key="index" :class="image.wrapperClass">
        <div :class="image.sizeClass">
          <img @click="openModal(index)" :src="getSrc(image.src)" :alt="image.alt" class="image-container" />
        </div>
      </div>
    </div>
    <div v-if="isModalOpen" @click="closeModal"
         class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <SnowFlakes icon="snow" />
      <div class="relative overflow-hidden w-full max-w-3xl h-auto" @click.stop ref="modalContent">
        <div class="slider-container">
          <div class="image-slider"
               :style="{ transform: `translateX(${translateX}px)`, transition: 'transform 0.5s ease' }">
            <img v-for="(image, index) in images"
                 :key="index"
                 :src="getSrc(image.src)"
                 :alt="image.alt"
                 class="image-item"
            />
          </div>
        </div>
        <!-- Left button -->
        <button v-if="selectedImageIndex !== 0" @click="prevSlide" class="nav-button left-0">
          &lt;
        </button>
        <!-- Right button -->
        <button v-if="selectedImageIndex !== images.length - 1" @click="nextSlide" class="nav-button right-0">
          &gt;
        </button>

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
import { nextTick, ref } from 'vue';
import SnowFlakes from '@/components/SnowFlakes.vue';

const images = [
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG00928-2.avif?alt=media&token=820da23e-1ccc-4573-bf23-b1dc1fa5e289', alt: 'Gallery Image 1', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG00853-1.avif?alt=media&token=2c51ccb9-5b14-462f-825a-6f523c891ac5', alt: 'Gallery Image 2', wrapperClass: 'vertical-wrapper', sizeClass: 'image-wrapper-50',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG00394-2.avif?alt=media&token=c7b4b5f8-c96e-443b-a86e-c993ba7de3f3', alt: 'Gallery Image 3', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG00153-2.avif?alt=media&token=e599d708-5165-44d8-bb4f-4d864349148e', alt: 'Gallery Image 4', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG00536-2.avif?alt=media&token=449165a3-211e-4a16-b76d-bfe5db29336b', alt: 'Gallery Image 5', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG00559-2.avif?alt=media&token=dcfc8010-a305-432c-8adc-995acc382f80', alt: 'Gallery Image 6', wrapperClass: 'vertical-wrapper', sizeClass: 'image-wrapper-50',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG00964-1.avif?alt=media&token=96543477-5dc7-4a7e-906c-eb2deb5b0bd2', alt: 'Gallery Image 7', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG01081-2.avif?alt=media&token=c5f8c3e9-ef2f-409c-807d-a5bbe8e47927', alt: 'Gallery Image 8', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG01099-2.avif?alt=media&token=8ea9a882-77ca-49ae-a5b3-9b0924262e4d', alt: 'Gallery Image 9', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG01185-2.avif?alt=media&token=67a00ca5-7f07-45d8-b6ce-620e14a84ec8', alt: 'Gallery Image 10', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKakaoTalk_20240909_214532445_01-2.avif?alt=media&token=a788c424-420f-414e-b725-063f97ff8705', alt: 'Gallery Image 11', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG01293-2.avif?alt=media&token=2c9482f3-3b38-4a54-b12b-6b7a3904e1cf', alt: 'Gallery Image 12', wrapperClass: 'vertical-wrapper', sizeClass: 'image-wrapper-50',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG01251-1.avif?alt=media&token=a3932eab-debd-4e9a-8710-c80cf0b913be', alt: 'Gallery Image 13', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG01525-2.avif?alt=media&token=61aaf2e1-3e54-48fe-ba13-338cc2dfe3a6', alt: 'Gallery Image 14', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
  {src: 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-f505f.appspot.com/o/image%2FKSG01501-1.avif?alt=media&token=4b7ae7f5-d34f-438b-94f5-64f9e448dff7', alt: 'Gallery Image 15', wrapperClass: 'horizontal-wrapper', sizeClass: 'image-wrapper-100',},
];

const isModalOpen = ref(false);
const selectedImageIndex = ref(0);
const translateX = ref(0);
const modalContent = ref(null);
const modalWidth = ref(0);

const openModal = (index) => {
  selectedImageIndex.value = index;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
  nextTick(() => {
    updateModalWidth();
    window.addEventListener('resize', updateModalWidth);
  });
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = '';
  window.removeEventListener('resize', updateModalWidth);
};

const updateModalWidth = () => {
  if (modalContent.value) {
    modalWidth.value = modalContent.value.offsetWidth;
    translateX.value = -selectedImageIndex.value * modalWidth.value;
  }
};

const nextSlide = () => {
  if (selectedImageIndex.value < images.length - 1) {
    selectedImageIndex.value++;
    translateX.value = -selectedImageIndex.value * modalWidth.value;
  }
};

const prevSlide = () => {
  if (selectedImageIndex.value > 0) {
    selectedImageIndex.value--;
    translateX.value = -selectedImageIndex.value * modalWidth.value;
  }
};

const goToSlide = (index) => {
  selectedImageIndex.value = index;
  translateX.value = -index * modalWidth.value;
};

const globImage = import.meta.glob('../assets/*.{jpeg,png,svg,jpg}', { eager: true });
const getSrc = (imageSrc) => {
  if (imageSrc.startsWith('http')) {
    return imageSrc;
  }
  return globImage[`../assets/${imageSrc}`]?.default || '';
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
  @apply relative w-full pt-[70%] overflow-hidden;
}

.image-wrapper-100 {
  @apply relative w-full pt-[145%] overflow-hidden;
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
  object-fit: contain;
  max-height: 80vh;
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

/* Navigation buttons */
.nav-button {
  @apply absolute top-1/2 transform -translate-y-1/2 text-white text-2xl p-2 bg-black bg-opacity-25 rounded-full;
}

.nav-button.left-0 {
  left: 10px;
}

.nav-button.right-0 {
  right: 10px;
}
</style>
