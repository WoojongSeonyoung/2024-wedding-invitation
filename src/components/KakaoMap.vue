<script setup>
import {KakaoMap, KakaoMapMarker} from 'vue3-kakao-maps';
import {ref} from "vue";

// 충주컨벤션센터 웨딩홀 좌표
const coordinate = {
  lat: 36.97685455559079,
  lng: 127.93678102637263
};

const naverUrl = 'https://m.place.naver.com/place/38252791/home';
const openUrl = (url) => {
  window.open(url, '_blank');
};

const visibleRef = ref(false);
const openInfo = () => {
  visibleRef.value = !visibleRef.value;
};
</script>

<template>
  <main class="map">
    <KakaoMap
        width="auto"
        height="400px"
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
          @onClickKakaoMapMarker="openInfo"
      >
      </KakaoMapMarker>
    </KakaoMap>
  </main>
</template>

<style scoped lang="postcss">
</style>
