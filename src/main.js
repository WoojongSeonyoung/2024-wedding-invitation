import { createApp } from 'vue'
import '@/styles/style.css'
import '@/styles/app.css'
import { useKakao } from 'vue3-kakao-maps/@utils';
import App from '@/App.vue'
import router from '@/router'

useKakao(import.meta.env.VITE_KAKAO_API_KEY)

createApp(App)
    .use(router)
    .mount('#app')
