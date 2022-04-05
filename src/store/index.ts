import { createPinia } from 'pinia';
import { useUserStore } from './modules/user';

const pinia = createPinia();

export {
    useAppStore
    , useUserStore
};
export default pinia;
