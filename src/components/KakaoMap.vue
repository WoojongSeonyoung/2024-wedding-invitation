<script setup>
import {KakaoMap, KakaoMapMarker} from 'vue3-kakao-maps';
import {ref} from "vue";
import SubTitle from "@/components/SubTitle.vue";

// 충주컨벤션센터 웨딩홀 좌표
const coordinate = {
  lat: 36.97685455559079,
  lng: 127.93678102637263
};

const naverMapUrl = 'https://map.naver.com/p/entry/place/38252791?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=127.9367989&lat=36.9768350&c=15.00,0,0,0,dh';
const kakaoMapUrl = 'https://kko.to/_eeUjwVwl3';
const tMapUrl = 'https://tmap.life/8e0e16ba';
const googleMapUrl = 'https://maps.app.goo.gl/tX3MWwJajaQB7FZT8';
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
    <section class="mt-4">
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
            @onClickKakaoMapMarker="openInfo"
        >
        </KakaoMapMarker>
      </KakaoMap>
    </section>
    <section class="flex justify-center space-x-6 mt-6">
      <!-- 네이버 지도 아이콘 -->
      <div class="iconTextWrapper">
        <img src="@/assets/icon/github-mark.svg" @click="openUrl(naverMapUrl)" class="appIcon" alt="Naver Map">
        <p class="appText">
          네이버
        </p>
      </div>

      <!-- 카카오 맵 아이콘 -->
      <div class="iconTextWrapper">
        <img src="@/assets/icon/github-mark.svg" @click="openUrl(kakaoMapUrl)" class="appIcon" alt="Kakao Map">
        <p class="appText">
          카카오맵
        </p>
      </div>

      <!-- T맵 아이콘 -->
      <div class="iconTextWrapper">
        <img src="@/assets/icon/github-mark.svg" @click="openUrl(tMapUrl)" class="appIcon" alt="TMap">
        <p class="appText">
          T맵
        </p>
      </div>

      <!-- 구글 지도 아이콘 -->
      <div class="iconTextWrapper">
        <img src="@/assets/icon/github-mark.svg" @click="openUrl(googleMapUrl)" class="appIcon" alt="Google Map">
        <p class="appText">
          구글맵
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped lang="postcss">
.iconTextWrapper {
  @apply flex flex-col items-center;

  .appText {
    @apply mt-2 text-sm;
  }

  .appIcon {
    @apply w-8 h-8 cursor-pointer;
  }
}
</style>
