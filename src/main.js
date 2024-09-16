import {createApp} from 'vue';
import '@/styles/style.css';
import '@/styles/app.css';
import {useKakao} from 'vue3-kakao-maps/@utils';
import App from '@/App.vue';
import router from '@/router';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// vue-toast-notification 임포트
import VueToast from 'vue-toast-notification';
// 테마 CSS 파일 임포트 (원하는 테마로 변경 가능)
import 'vue-toast-notification/dist/theme-sugar.css';

useKakao(import.meta.env.VITE_KAKAO_API_KEY);

createApp(App)
    .use(router)
    .use(VueToast, {
        // 옵션 설정 (선택 사항)
        position: 'top', // 'top', 'bottom', 'top-right', 'bottom-right', 'top-left', 'bottom-left', 'center'
        duration: 3000, // 토스트 자동 닫힘 시간 (밀리초)
        // 추가 옵션은 필요에 따라 설정하세요
    })
    .component('VueDatePicker', VueDatePicker)
    .mount('#app');
