<template>
  <div class="w-full flex justify-center">
    <section class="datepicker-container">
      <br/>
      <p>2024.11.16 토요일 오전 11시</p>
      <br/>
      <VueDatePicker
          class="mx-auto max-w-full flex-col"
          v-model="date"
          :min-date="minMaxDate"
          :max-date="minMaxDate"
          :min-time="minMaxTime"
          :max-time="minMaxTime"
          :year-range="[2013, 2024]"
          :disabled-dates="disabledDates"
          :on-year-change="resetDate"
          :on-month-change="resetDate"
          :format-locale="ko"
          format="E"
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
          <img class="slot-icon" src="@/assets/icon/favorite.svg" alt="favorite"/>
        </template>
      </VueDatePicker>
      <br/>
      <p>우리가 처음 만난 지
        <DdayCalculator :date="new Date('2013-06-02')"/>
        일
      </p>
      <p>
        우종, 선영의 결혼식이
        <DdayCalculator ref="ddayCalc" :date="new Date('2024-11-16')" />
        <template v-if="ddayResult !== 'today'">일</template>
      </p>
      <p>
        <template v-if="ddayResult === 'today'">입니다</template>
        <template v-else>지났습니다</template>
      </p>
      <br/>
    </section>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import DdayCalculator from '@/components/DdayCalculator.vue';
import {ko} from 'date-fns/locale';
import { onMounted, ref, watch } from 'vue';

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

const ddayCalc = ref(null);
const ddayResult = ref('');

onMounted(() => {
  watch(() => ddayCalc.value.result, (newValue) => {
    if (newValue) {
      ddayResult.value = newValue;
    }
  }, { immediate: true });
});
</script>

<style scoped lang="postcss">
.datepicker-container {
  @apply w-full bg-gray-50 p-4 shadow-lg rounded-lg text-center;
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

<style>
:root {
  .dp--tp-wrap {
    max-width: 600px;
  }
}
</style>
