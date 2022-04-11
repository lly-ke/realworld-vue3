import {
    favoriteArticle,
    unFavoriteArticle,
} from '@/api/article'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import router from '@/router/index'

//喜欢文章或取消喜欢文章
export const useFavoriteOrUnFavoriter = (article: any) => {
    // let router = useRouter()
    console.log(router)
    let userStore = useUserStore()
    let { isLogin } = storeToRefs(userStore)

    // 判断没有登陆跳转到登陆页面
    if (!isLogin.value) {
        router.push('/user/login')
        return
    }
    if (article?.favorited) {
        unFavoriteArticle(article.slug).then(() => {
            article.favorited = false
            article.favoritesCount--
        })
    } else {
        favoriteArticle(article.slug).then(() => {
            article.favorited = true
            article.favoritesCount++
        })
    }
}