<template>
  <main>
    <SubTitle message="갤러리"/>
    <Gallery/>
    <Divider/>
    <Calendar/>
    <Divider/>
    <SubTitle message="오시는 길"/>
    <KakaoMap/>
    <QuoteCard v-for="card in cards" :title="card.title" :content="card.content"/>
    <Footer/>
  </main>
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import KakaoMap from '@/components/KakaoMap.vue';
import SubTitle from '@/components/SubTitle.vue';
import Divider from '@/components/Divider.vue';
import QuoteCard from '@/components/QuoteCard.vue';
import Calendar from '@/components/Calendar.vue';
import Gallery from '@/components/Gallery.vue';

const cards = [
  {
    title: '주소',
    content: `충청북도 충주시 봉현로 296 (교현동 413-1)
              TEL. 043-854-7777`,
  },
  {
    title: '버스',
    content: `충주공용버스터미널 앞 택시승강장에서 승차`,
  },
  {
    title: '대절버스',
    content: `출발시각 : 2024년 11월 16일 오전
              장소 : 김천
              문의 : 신랑 父 김명인丨010- `,
  },
  {
    title: '주차',
    content: `본관 주차시설 이용 및 예식장 20m 뒤
              플래티늄요양원 주차장 이용`,
  },
];

</script>

<style scoped lang="postcss">

</style>
