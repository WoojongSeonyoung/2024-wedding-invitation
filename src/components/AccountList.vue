<template>
  <section>
    <section class="text-center">
      <p>
        저희의 행복한 첫걸음을 따듯한 마음으로 축복해 주시면
      </p>
      <p>
        더없이 행복하게 잘 살겠습니다.
      </p>
    </section>
    <section class="mt-8">
      <div class="flex">
        <p class="flex-1">신랑 측 계좌번호</p>
        <button @click="toggleHusbandAccounts"
                class="toggle-button"
                :class="isHusbandAccountsVisible ? 'bg-blue-300' : 'bg-gray-300'"
        >
          {{ isHusbandAccountsVisible ? '숨기기' : '펼치기' }}
        </button>
      </div>
      <transition name="fade">
        <div v-if="isHusbandAccountsVisible">
          <div class="border-t border-gray-300 my-4"></div>
          <div v-for="(account, index) in accountListHusband"
               :key="`husband-${index}`"
               class="account-item"
          >
            <div class="account-info">
              <div class="account-line">
                <span>{{ account.title }}</span>
                <span>{{ account.name }}</span>
              </div>
              <div class="account-line">
                <span>{{ account.accountBank }}</span>
                <span>{{ account.accountNumber }}</span>
              </div>
            </div>
            <button
              @click="copyAccountNumber(account)"
              :class="[
            'text-white px-2 py-1 rounded cursor-pointer',
            account.copied ? 'bg-blue-300 animate-bounce' : 'bg-gray-300',
          ]"
              :aria-label="`${account.name}의 계좌번호 복사하기`"
            >
              {{ account.copied ? '복사됨' : '복사' }}
            </button>
          </div>
        </div>
      </transition>
    </section>
    <section class="mt-8">
      <div class="flex">
        <p class="flex-1">신부 측 계좌번호</p>
        <button @click="toggleWifeAccounts"
                class="toggle-button"
                :class="isWifeAccountsVisible ? 'bg-rose-300' : 'bg-gray-300'"
        >
          {{ isWifeAccountsVisible ? '숨기기' : '펼치기' }}
        </button>
      </div>
      <transition name="fade">
        <div v-if="isWifeAccountsVisible">
          <div class="border-t border-gray-300 my-4"></div>
          <div v-for="(account, index) in accountListWife"
               :key="`wife-${index}`"
               class="account-item"
          >
            <div class="account-info">
              <div class="account-line">
                <span>{{ account.title }}</span>
                <span>{{ account.name }}</span>
              </div>
              <div class="account-line">
                <span>{{ account.accountBank }}</span>
                <span>{{ account.accountNumber }}</span>
              </div>
            </div>
            <button
              @click="copyAccountNumber(account)"
              :class="[
            'text-white px-2 py-1 rounded cursor-pointer',
            account.copied ? 'bg-rose-300 animate-bounce' : 'bg-gray-300',
          ]"
              :aria-label="`${account.name}의 계좌번호 복사하기`"
            >
              {{ account.copied ? '복사됨' : '복사' }}
            </button>
          </div>
        </div>
      </transition>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const accountListHusband = ref([
  { title: '신랑', name: '김우종', accountBank: '카카오뱅크', accountNumber: '3333-31-1010545', copied: false },
  { title: '아버지', name: '김명인', accountBank: '국민', accountNumber: '9-3826-2605-53', copied: false },
  { title: '어머니', name: '이현주', accountBank: '국민', accountNumber: '613-21-1382-945', copied: false },
]);

const accountListWife = ref([
  { title: '신부', name: '김선영', accountBank: '국민', accountNumber: '038701-04-578756', copied: false },
  { title: '아버지', name: '김태영', accountBank: '농협', accountNumber: '173209-52-021914', copied: false },
  { title: '어머니', name: '표향연', accountBank: '농협', accountNumber: '352-2081-1855-33', copied: false },
]);

const isHusbandAccountsVisible = ref(false);
const isWifeAccountsVisible = ref(false);

const toggleHusbandAccounts = () => {
  isHusbandAccountsVisible.value = !isHusbandAccountsVisible.value;
};

const toggleWifeAccounts = () => {
  isWifeAccountsVisible.value = !isWifeAccountsVisible.value;
};

const copyAccountNumber = (account) => {
  navigator.clipboard.writeText(account.accountNumber)
    .then(() => {
      toast.success('계좌번호가 복사되었습니다.');
      account.copied = true;
      setTimeout(() => {
        account.copied = false;
      }, 3000);
    })
    .catch((err) => {
      console.error('계좌번호 복사 실패:', err);
      toast.error('계좌번호 복사에 실패했습니다.');
    });
};
</script>

<style scoped lang="postcss">
.account-item {
  @apply flex items-center justify-between mb-1;
}

.account-info {
  @apply flex flex-col flex-grow my-1;
}

.account-line {
  @apply flex items-center mb-1;
}

.account-info span {
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
