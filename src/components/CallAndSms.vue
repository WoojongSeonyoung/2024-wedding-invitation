<template>
  <section>
    <section class="mt-16">
      <div class="flex">
        <p class="flex-1">신랑 측</p>
        <button @click="toggleHusbandPhoneNumbers"
                class="toggle-button"
                :class="isHusbandPhoneNumbersVisible ? 'bg-blue-300' : 'bg-gray-300'"
        >
          {{ isHusbandPhoneNumbersVisible ? '숨기기' : '펼치기' }}
        </button>
      </div>
      <transition name="fade">
        <div v-if="isHusbandPhoneNumbersVisible">
          <div class="border-t border-gray-300 my-4"></div>
          <div v-for="(phoneNumberInfo, index) in husbandPhoneNumbers"
               :key="`husband-${index}`"
               class="phone-number-item"
          >
            <div class="phone-number-info">
              <div class="phone-number-line">
                <span>{{ phoneNumberInfo.title }}</span>
                <span>{{ phoneNumberInfo.name }}</span>
              </div>
            </div>
            <button
                @click="call(phoneNumberInfo.phoneNumber)"
                class="w-7 h-7 cursor-pointer p-1 text-white bg-blue-300 rounded-full shadow-lg"
            >
              <PhoneIcon/>
            </button>
          </div>
        </div>
      </transition>
    </section>
    <section class="mt-8">
      <div class="flex">
        <p class="flex-1">신부 측</p>
        <button @click="toggleWifePhoneNumbers"
                class="toggle-button"
                :class="isWifePhoneNumbersVisible ? 'bg-rose-300' : 'bg-gray-300'"
        >
          {{ isWifePhoneNumbersVisible ? '숨기기' : '펼치기' }}
        </button>
      </div>
      <transition name="fade">
        <div v-if="isWifePhoneNumbersVisible">
          <div class="border-t border-gray-300 my-4"></div>
          <div v-for="(phoneNumberInfo, index) in wifePhoneNumbers"
               :key="`wife-${index}`"
               class="phone-number-item"
          >
            <div class="phone-number-info">
              <div class="phone-number-line">
                <span>{{ phoneNumberInfo.title }}</span>
                <span>{{ phoneNumberInfo.name }}</span>
              </div>
            </div>
            <button
                @click="call(phoneNumberInfo.phoneNumber)"
                class="w-7 h-7 cursor-pointer p-1 text-white bg-rose-300 rounded-full shadow-lg"
            >
              <PhoneIcon/>
            </button>
          </div>
        </div>
      </transition>
    </section>
  </section>
</template>

<script setup>
import {PhoneIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";

const husbandPhoneNumbers = [
  {
    title: "신랑",
    name: "김우종",
    phoneNumber: "010-7188-8309",
  },
  {
    title: "아버지",
    name: "김명인",
    phoneNumber: "010-3826-2605",
  },
  {
    title: "어머니",
    name: "이현주",
    phoneNumber: "010-6427-2605",
  },
];

const wifePhoneNumbers = [
  {
    title: "신부",
    name: "김선영",
    phoneNumber: "010-3130-1549",
  },
  {
    title: "아버지",
    name: "김태영",
    phoneNumber: "010-5492-1549",
  },
  {
    title: "어머니",
    name: "표향연",
    phoneNumber: "010-7187-1549",
  },
];

const isHusbandPhoneNumbersVisible = ref(false);
const isWifePhoneNumbersVisible = ref(false);

const toggleHusbandPhoneNumbers = () => {
  isHusbandPhoneNumbersVisible.value = !isHusbandPhoneNumbersVisible.value;
};

const toggleWifePhoneNumbers = () => {
  isWifePhoneNumbersVisible.value = !isWifePhoneNumbersVisible.value;
};

const call = (phoneNumber) => {
  window.location.href = `tel:${phoneNumber}`;
};

</script>


<style scoped lang="postcss">
.phone-number-item {
  @apply flex items-center justify-between mb-1;
}

.phone-number-info {
  @apply flex flex-col flex-grow my-1;
}

.phone-number-line {
  @apply flex items-center mb-1;
}

.phone-number-info span {
  @apply mr-2;
}

.toggle-button {
  @apply px-2 py-1 text-white rounded cursor-pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>