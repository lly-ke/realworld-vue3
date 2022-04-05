import { post, get } from '@/utils/http/axios'

enum URL {
    globalArticleList = "/articles",
    tagList = '/tags',
}


const globalArticleList = async () => get({ url: URL.globalArticleList })
const tagList = async () => get({ url: URL.tagList })

export { globalArticleList, tagList };