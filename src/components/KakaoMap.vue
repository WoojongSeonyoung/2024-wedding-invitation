<script setup>
import {KakaoMap, KakaoMapMarker} from 'vue3-kakao-maps';
import {ref} from "vue";

const mapUrl = 'https://m.place.naver.com/place/38252791/home';

const coordinate = {
  lat: 36.97685455559079,
  lng: 127.93678102637263
};

const onClickKakaoMapMarker = ()=> {
  window.open(mapUrl, '_blank');
};
const visibleRef = ref(false);
const mouseOverKakaoMapMarker = () => {
  visibleRef.value = true;
};
const mouseOutKakaoMapMarker = () => {
  visibleRef.value = false;
};
</script>

<template>
  <main class="map">
    <KakaoMap
        width="100%"
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
          :infoWindow="{ content: '컨벤션센터 웨딩홀', visible: visibleRef }"
          @onClickKakaoMapMarker="onClickKakaoMapMarker"
          @mouseOverKakaoMapMarker="mouseOverKakaoMapMarker"
          @mouseOutKakaoMapMarker="mouseOutKakaoMapMarker"
      >
      </KakaoMapMarker>
    </KakaoMap>
  </main>
</template>

<style scoped lang="postcss">
</style>
