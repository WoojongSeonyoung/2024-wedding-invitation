<template>
  <span v-if="isToday" class="text-rose-400">오늘</span>
  <span v-else class="text-rose-400">
    {{ tweened.number.toFixed(0) }}
    <!--    🤵🏻 👰🏻‍♀️-->
  </span>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import gsap from 'gsap';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const props = defineProps({
  date: Date,
});

const number = ref(0);
const tweened = reactive({
  number: 0,
});
const isToday = ref(false);

onMounted(() => {
  // 3초 대기 후 setDday 실행
  setTimeout(() => {
    setDday();
  }, 3000);
});

const setDday = () => {
  const targetDate = dayjs.tz(props.date, 'Asia/Seoul').startOf('day');
  const today = dayjs.tz(new Date(), 'Asia/Seoul').startOf('day');

  const diffDays = targetDate.diff(today, 'day');

  // 날짜 차이에 따라 다른 메시지 설정
  if (diffDays > 0) {
    number.value = diffDays; // 목표일까지 남은 일수
    isToday.value = false;
  } else if (diffDays === 0) {
    number.value = 0; // 오늘이 목표일
    isToday.value = true;
  } else {
    number.value = Math.abs(diffDays); // 목표일이 지나간 경우
    isToday.value = false;
  }
};

watch(number, (n) => {
  gsap.to(tweened, {duration: 3, number: Number(n) || 0});
});

const result = computed(() => {
  return isToday.value ? 'today' : tweened.number.toFixed(0);
});

defineExpose({ result });
</script>

<style scoped lang="postcss">

</style>
