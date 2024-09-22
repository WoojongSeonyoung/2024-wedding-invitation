<template>
  <main>
    <FirstView/>
    <Divider/>
    <SubTitle message="☘️"/>
    <SubTitle message="소중한 분들을 초대합니다"/>
    <SecondView/>
    <section class="p-6">
      <Divider class="animate-section"/>
      <SubTitle class="animate-section" message="갤러리"/>
      <Gallery/>
      <Divider/>
      <Calendar class="animate-section"/>
      <Divider/>
      <SubTitle class="animate-section" message="오시는 길"/>
      <KakaoMap class="animate-section"/>
      <QuoteCard v-for="card in cards" :title="card.title" :content="card.content" class="animate-section"/>
      <Divider/>
      <SubTitle class="animate-section" message="마음 전하실 곳"/>
      <AccountList class="animate-section"/>
      <Divider/>
      <SubTitle class="animate-section" message="연락하기"/>
      <CallAndSms class="animate-section"/>
      <Divider/>
      <SubTitle class="animate-section" message="방명록"/>
      <ChatRoom class="animate-section"/>
    </section>
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
import FirstView from "@/components/FirstView.vue";
import SecondView from "@/components/SecondView.vue";
import AccountList from "@/components/AccountList.vue";
import ChatRoom from "@/components/ChatRoom.vue";
import CallAndSms from "@/components/CallAndSms.vue";
import { onMounted, ref } from 'vue';

const cards = [
  {
    title: '주소',
    content: `충청북도 충주시 봉현로 296(교현동 413-1)
              TEL. 043-854-7777`,
  },
  {
    title: '전세버스(김천)',
    content: `출발시각 : 2024년 11월 16일 오전 7시 30분
              장소 : 김천문화예술회관 뒤편 주차장
              문의 : 신랑 父 김명인丨010-3826-2605`,
  },
  {
    title: '주차',
    content: `본관 주차시설 이용 및 예식장 20m 뒤
              플래티늄요양원 주차장 이용`,
  },
];

const sections = ref([]);

onMounted(() => {
  // 모든 .animate-section 클래스를 가진 요소를 선택
  sections.value = document.querySelectorAll('.animate-section');

  // IntersectionObserver 옵션
  const observerOptions = {
    threshold: 0.5, // 10%가 보일 때 트리거
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in'); // 페이드 인 효과 추가
        observer.unobserve(entry.target); // 관찰 해제
      }
    });
  }, observerOptions);

  // 각 섹션을 관찰 대상으로 설정
  sections.value.forEach((section) => {
    observer.observe(section);
  });
});

</script>

<style scoped lang="postcss">
/* 기본적으로 섹션을 숨김 (페이드 전) */
.animate-section {
  opacity: 0;
  transform: translateY(50px); /* 슬라이드 인 효과 */
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
}

/* 화면에 보일 때 페이드 인 및 슬라이드 인 효과 */
.fade-in {
  opacity: 1;
  transform: translateY(0); /* 원래 위치로 */
}
</style>
