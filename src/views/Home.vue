<script setup>
import {onMounted, ref} from 'vue'
import Footer from "@/components/Footer.vue";
import KakaoMap from "@/components/KakaoMap.vue";
import SubTitle from "@/components/SubTitle.vue";
import Divider from "@/components/Divider.vue";

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <main>
    <Divider />
    <SubTitle message="오시는 길" />
    <KakaoMap />
    <Footer />
  </main>
</template>

<style scoped lang="postcss">

</style>
