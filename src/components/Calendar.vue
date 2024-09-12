<template>
  <div class="w-full flex justify-center">
    <section class="datepicker-container">
      <p>2024.11.16</p>
      <p>토요일 오전 11시</p>
      <VueDatePicker
        class="mx-auto max-w-full"
        v-model="date"
        :min-date="minMaxDate"
        :max-date="minMaxDate"
        :min-time="minMaxTime"
        :max-time="minMaxTime"
        :year-range="[2020, 2030]"
        :disabled-dates="disabledDates"
        :on-year-change="resetDate"
        :on-month-change="resetDate"
        week-start="0"
        prevent-min-max-navigation
        inline
        auto-apply
      >
        <template #arrow-left>
          🤵🏻
        </template>
        <template #arrow-right>
          👰🏻‍♀️
        </template>
        <template #clock-icon>
          <img class="slot-icon" src="@/assets/icon/favorite.svg" alt="favorite" />
        </template>
      </VueDatePicker>
      <p>우리가 처음 만난 지
        <DdayCalculator date="2013-06-02" />
        일
      </p>
      <p>우종, 선영의 결혼식이
        <DdayCalculator date="2024-11-16" />
        일 남았습니다.
      </p>
    </section>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import DdayCalculator from '@/components/DdayCalculator.vue';

const minMaxDate = new Date('2024-11-16');
const minMaxTime = new Date('2024-11-16 11:00:00');
const date = new Date('2024-11-16 11:00:00');

const disabledDates = (date) => {
  return date.getMonth() !== minMaxDate.getMonth() || date.getFullYear() !== minMaxDate.getFullYear();
};

const resetDate = () => {
  date.setFullYear(minMaxDate.getFullYear());
  date.setMonth(minMaxDate.getMonth());
};
</script>

<style scoped lang="postcss">
.datepicker-container {
  @apply w-[600px] bg-gray-50 p-4 shadow-lg rounded-lg text-center;
}

.slot-icon {
  height: 20px;
  width: auto;
  opacity: 0.5;
}

p {
  @apply text-lg
}

</style>
