<template>
  <transition name="fade">
    <div v-if="showCinemaEffect" class='outer-scratch'>
      <div class="inner-scratch">
        <div class="background grain"></div>
        <h1>
          <span>안녕하세요.</span>
        </h1>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// showCinemaEffect 상태를 통해 컴포넌트 표시 여부를 제어
const showCinemaEffect = ref(true);

onMounted(() => {
  // 컴포넌트가 렌더링된 후 5초 후에 fadeout을 실행
  setTimeout(() => {
    showCinemaEffect.value = false;
  }, 5000); // 5초 후에 fadeout (원하는 시간으로 조절 가능)
});
</script>

<style scoped lang="postcss">
@import url(https://fonts.googleapis.com/css?family=Roboto:100);

/* Fade In/Out 트랜지션 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active의 별칭 */
{
  opacity: 0;
}

.background {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/abstract.jpg');
  //background: antiquewhite;
  background-size: cover;
}

.outer-scratch, .inner-scratch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; /* 다른 요소 위에 위치하게 설정 */
}

.outer-scratch:after, .inner-scratch:after {
  content: '';
  width: 120%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 100px;
  opacity: .08;
  background: url('@/assets/scratch.png') repeat center center;
  animation: scratch 0.45s steps(1) infinite;
}

.inner-scratch:after {
  left: 30%;
  animation: inner-scratch 2s infinite;
}

.grain:after {
  content: '';
  width: 110%;
  height: 110%;
  position: absolute;
  top: -5%;
  left: -5%;
  opacity: .11;
  background: url('@/assets/grain.jpg') repeat center center;
  animation: grain 0.5s steps(1) infinite;
}

h1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  font-size: 3em;
  text-align: center;
  color: #fff;
  animation: fade 3s;

  span {
    display: inline-block;
    position: relative;
    padding: .5em 1em;

    &:before {
      display: block;
      content: '';
      width: 110%;
      margin-left: -5%;
      margin-bottom: 5%;
      border-top: 1px solid #fff;
      animation: draw 2.5s;
    }

    &:after {
      display: block;
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      border-bottom: 1px solid #fff;
      animation: draw-bottom 2.5s;
    }
  }
}

@keyframes grain {
  0%, 100% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-1%, -1%);
  }
  20% {
    transform: translate(1%, 1%);
  }
  30% {
    transform: translate(-2%, -2%);
  }
  40% {
    transform: translate(3%, 3%);
  }
  50% {
    transform: translate(-3%, -3%);
  }
  60% {
    transform: translate(4%, 4%);
  }
  70% {
    transform: translate(-4%, -4%);
  }
  80% {
    transform: translate(2%, 2%);
  }
  90% {
    transform: translate(-3%, -3%);
  }
}

@keyframes scratch {
  0%, 100% {
    transform: translateX(0);
    opacity: 0.075;
  }
  10% {
    transform: translateX(-1%);
  }
  20% {
    transform: translateX(1%);
  }
  30% {
    transform: translateX(-2%);
    opacity: 0.09;
  }
  40% {
    transform: translateX(3%);
  }
  50% {
    transform: translateX(-3%);
    opacity: 0.05;
  }
  60% {
    transform: translateX(8%);
  }
  70% {
    transform: translateX(-3%);
  }
  80% {
    transform: translateX(10%);
    opacity: 0.02;
  }
  90% {
    transform: translateX(-2%);
  }
}

@keyframes inner-scratch {
  0% {
    transform: translateX(0);
    opacity: 0.08;
  }
  10% {
    transform: translateX(-1%);
  }
  20% {
    transform: translateX(1%);
  }
  30% {
    transform: translateX(-2%);
  }
  40% {
    transform: translateX(3%);
  }
  50% {
    transform: translateX(-3%);
    opacity: 0.06;
  }
  60% {
    transform: translateX(8%);
  }
  70% {
    transform: translateX(-3%);
  }
  80% {
    transform: translateX(10%);
    opacity: 0.03;
  }
  90% {
    transform: translateX(20%);
  }
  100% {
    transform: translateX(30%);
  }
}

@keyframes draw {
  0% {
    width: 0;
  }
  100% {
    width: 110%;
  }
}

@keyframes draw-bottom {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
