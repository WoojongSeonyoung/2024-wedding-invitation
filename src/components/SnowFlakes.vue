<template>
  <div class="snowflakes">
    <img v-for="n in 200"
         :key="n"
         class="snowflake"
         :style="{ width: `${Math.random() * 20 + 10}px` }"
         src="@/assets/icon/favorite.svg"
         alt="눈송이"
    />
  </div>
</template>
<script setup>
</script>

<style scoped lang="postcss">
/* 눈송이 애니메이션 */
.snowflakes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -100px;
  animation: fall linear infinite, twinkle 5s ease-in-out infinite; /* 눈 내리는 효과와 반짝임 효과 */
  opacity: 0.8;
  will-change: transform;
}

/* 다양한 속도와 위치로 눈송이 배치 */
.snowflake:nth-child(1) {
  left: 10%;
  animation-duration: 11s;
  animation-delay: 0s;
}

.snowflake:nth-child(2) {
  left: 20%;
  animation-duration: 10s;
  animation-delay: 1s;
}

.snowflake:nth-child(3) {
  left: 30%;
  animation-duration: 12s;
  animation-delay: 8s;
}

.snowflake:nth-child(4) {
  left: 40%;
  animation-duration: 11s;
  animation-delay: 3s;
}

.snowflake:nth-child(5) {
  left: 50%;
  animation-duration: 10s;
  animation-delay: 6s;
}

.snowflake:nth-child(6) {
  left: 60%;
  animation-duration: 11s;
  animation-delay: 5s;
}

.snowflake:nth-child(7) {
  left: 70%;
  animation-duration: 10s;
  animation-delay: 4s;
}

.snowflake:nth-child(8) {
  left: 80%;
  animation-duration: 12s;
  animation-delay: 7s;
}

.snowflake:nth-child(9) {
  left: 90%;
  animation-duration: 10s;
  animation-delay: 2s;
}

.snowflake:nth-child(10) {
  left: 15%;
  animation-duration: 11s;
  animation-delay: 10s;
}

.snowflake:nth-child(11) {
  left: 25%;
  animation-duration: 10s;
  animation-delay: 9s;
}

.snowflake:nth-child(12) {
  left: 35%;
  animation-duration: 12s;
  animation-delay: 2s;
}

.snowflake:nth-child(13) {
  left: 45%;
  animation-duration: 11s;
  animation-delay: 7s;
}

.snowflake:nth-child(14) {
  left: 55%;
  animation-duration: 10s;
  animation-delay: 4s;
}

.snowflake:nth-child(15) {
  left: 65%;
  animation-duration: 11s;
  animation-delay: 5s;
}

.snowflake:nth-child(16) {
  left: 75%;
  animation-duration: 10s;
  animation-delay: 6s;
}

.snowflake:nth-child(17) {
  left: 85%;
  animation-duration: 12s;
  animation-delay: 3s;
}

.snowflake:nth-child(18) {
  left: 95%;
  animation-duration: 10s;
  animation-delay: 8s;
}

/* 눈송이가 문서 전체를 기준으로 아래로 떨어지도록 조정 */
@keyframes fall {
  0% {
    transform: translateY(-100px) rotate(0deg);
  }
  100% {
    transform: translateY(200vh) rotate(720deg);
  }
}

/* 눈송이 반짝임 효과 */
@keyframes twinkle {
  0%, 50%, 100% {
    opacity: 1;
    filter: brightness(1.2);
  }
  12.5%, 37.5%, 62.5%, 87.5% {
    opacity: 1;
    filter: brightness(2);
  }
  25%, 75% {
    opacity: 1;
    filter: brightness(1.6);
  }
}
</style>
