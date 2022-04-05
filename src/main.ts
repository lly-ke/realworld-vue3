import { getToken } from '@/utils/auth';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useUserStore } from './store'
import './index.css'
import piniaStore from './store';
// import ArcoVue from "@arco-design/web-vue"
// import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
// 额外引入图标库
// import ArcoVueIcon from '@arco-design/web-vue/es/icon';
// import '@arco-design/web-vue/dist/arco.css';
// 支持SVG
import 'virtual:svg-icons-register'
// import Antd from 'ant-design-vue'
import { getUserInfo } from './api/user';

createApp(App).use(router)
    // .use(ArcoVue)
    // .use(Antd)
    // .use(ArcoVueIcon)
    .use(piniaStore).mount('#app')


let token = getToken()
let userStore = useUserStore()
if (token) {
    getUserInfo().then(({ data }) => {
        userStore.setLoginData(data.user)
    })
}
