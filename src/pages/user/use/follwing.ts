
import { follow, unFollow } from '@/api/user'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { Ref } from 'vue'


let userStore = useUserStore()
let { isLogin } = storeToRefs(userStore)

export const useFollowOrUnfollow = (isFollowing: Ref<boolean>, username: string) => {

    // 判断没有登陆跳转到登陆页面
    if (!isLogin.value) {
        router.push('/user/login')
        return
    }
    if (isFollowing.value) {
        unFollow(username).then(() => {
            isFollowing.value = false
        })
    } else {
        follow(username).then(() => {
            isFollowing.value = true
        })
    }
}