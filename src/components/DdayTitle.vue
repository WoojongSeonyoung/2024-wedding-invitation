<template>
  <section>
    <p>
      {{ titleMessage }}
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  date: String,
})

const titleMessage = ref('');

onMounted(() => {
  // 현재 날짜 가져오기
  const targetDate = new Date();
  const today = new Date();

  // 날짜 차이 계산 (밀리초 단위 -> 일 단위)
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 밀리초 -> 일 변환

  // 날짜 차이에 따라 다른 메시지 설정
  if (diffDays > 0) {
    titleMessage.value = `D-${diffDays}`; // 목표일까지 남은 일수
  } else if (diffDays === 0) {
    titleMessage.value = 'Today'; // 오늘이 목표일
  } else {
    titleMessage.value = `D+${Math.abs(diffDays)}`; // 목표일이 지나간 경우
  }
});
</script>

<style scoped lang="postcss">

</style>
