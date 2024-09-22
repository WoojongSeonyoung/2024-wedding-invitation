<template>
  <section class="flex justify-center space-x-10 mt-8">
    <button
        @click="copyLink"
        class="w-12 h-12 cursor-pointer p-2 text-white bg-gray-400 rounded-full shadow-lg"
    >
      <LinkIcon/>
    </button>
    <button
        @click="shareKakao"
        class="w-12 h-12 cursor-pointer text-white rounded-full shadow-lg">

      <img src="@/assets/icon/kakaoLogo.png" alt="kakao"/>
    </button>
  </section>
</template>

<script setup>
import {LinkIcon} from "@heroicons/vue/24/outline/index.js";
import {useToast} from 'vue-toast-notification';
import {onMounted} from "vue";

const toast = useToast();

const copyLink = () => {
  navigator.clipboard.writeText('https://woojongseonyoung.github.io/2024-wedding-invitation/')
      .then(() => {
        toast.success('링크가 복사되었습니다.');
      })
      .catch((err) => {
        console.error('링크 복사 실패:', err);
        toast.error('링크 복사에 실패했습니다.');
      });
};

const shareKakao = () => {
  Kakao.Share.sendCustom({
    templateId: 112425,
  });
};

onMounted(() => {
  Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
});

</script>

<style scoped lang="postcss">

</style>