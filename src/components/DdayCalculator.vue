<template>
  <span class="text-rose-400">
    {{ tweened.number.toFixed(0) }}
<!--    🤵🏻 👰🏻‍♀️-->
  </span>
</template>

<script setup>
import {ref, onMounted, reactive, watch} from 'vue';
import gsap from 'gsap'

let props = defineProps({
  date: String,
});

const number = ref(0)
const tweened = reactive({
  number: 0
})

onMounted(() => {
  // 5초 대기 후 setDday 실행
  setTimeout(() => {
    setDday();
  }, 5000); // 5000ms = 5초
});

const setDday = () => {
  // 현재 날짜 가져오기
  const targetDate = new Date(props.date);
  const today = new Date();

  // 날짜 차이 계산 (밀리초 단위 -> 일 단위)
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 밀리초 -> 일 변환

  // 날짜 차이에 따라 다른 메시지 설정
  if (diffDays > 0) {
    number.value = diffDays; // 목표일까지 남은 일수
  } else if (diffDays === 0) {
    number.value = 0; // 오늘이 목표일
  } else {
    number.value = Math.abs(diffDays); // 목표일이 지나간 경우
  }
}

watch(number, (n) => {
  gsap.to(tweened, { duration: 3, number: Number(n) || 0 })
})

</script>

<style scoped lang="postcss">

</style>
