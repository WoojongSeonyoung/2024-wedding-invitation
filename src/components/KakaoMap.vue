<template>
  <main class="map mt-4">
    <section>
      <KakaoMap
          width="auto"
          height="300px"
          :lat="coordinate.lat"
          :lng="coordinate.lng"
          :draggable="true"
          :scrollwheel="true"
          :level="4"
      >
        <KakaoMapMarker
            :lat="coordinate.lat"
            :lng="coordinate.lng"
            :clickable="true"
            :infoWindow="{ content: '충주컨벤션 웨딩홀', visible: visibleRef }"
            @onClickKakaoMapMarker="toggleInfo"
        >
        </KakaoMapMarker>
      </KakaoMap>
    </section>
    <section class="flex justify-center space-x-6 mt-6 mb-6">
      <div v-for="map in mapLinks" :key="map.fileName" class="iconTextWrapper">
        <img :src="getSrc(map.fileName)" @click="openUrl(map.url)" class="appIcon" :alt="map.fileName"/>
        <p class="appText">{{ map.koName }}</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import {KakaoMap, KakaoMapMarker} from 'vue3-kakao-maps';
import {ref} from 'vue';

// 충주컨벤션센터 웨딩홀 좌표
const coordinate = {
  lat: 36.97685455559079,
  lng: 127.93678102637263,
};

const mapLinks = [
  {
    fileName: 'naverMap.jpeg',
    url: 'https://map.naver.com/p/entry/place/38252791?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=127.9367989&lat=36.9768350&c=15.00,0,0,0,dh',
    koName: '네이버',
  },
  {
    fileName: 'kakaoMap.png',
    url: 'https://kko.to/_eeUjwVwl3',
    koName: '카카오맵',
  },
  {
    fileName: 'TMAP.svg',
    url: 'https://tmap.life/8e0e16ba',
    koName: 'T맵',
  },
  {
    fileName: 'googleMap.png',
    url: 'https://maps.app.goo.gl/tX3MWwJajaQB7FZT8',
    koName: '구글맵',
  },
];
const images = import.meta.glob('../assets/icon/*.{jpeg,png,svg}', {eager: true});
const getSrc = (fileName) => images[`../assets/icon/${fileName}`]?.default || '';
const openUrl = (url) => window.open(url, '_blank');
const visibleRef = ref(false);
const toggleInfo = () => (visibleRef.value = !visibleRef.value);
</script>

<style scoped lang="postcss">
.iconTextWrapper {
  @apply flex flex-col items-center;

  .appText {
    @apply mt-2 text-sm;
  }

  .appIcon {
    @apply w-10 h-10 cursor-pointer;
  }
}
</style>
