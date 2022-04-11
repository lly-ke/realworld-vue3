import { post, get, del, put } from '@/utils/http/axios'
import { IArticle } from './types'
enum URL {
    globalArticleList = "/articles",
    feedlArticleList = "/articles/feed",
    createArticle = "/articles",
    tagList = '/tags'
}

const globalArticleList = async (params?: any) => get({ url: URL.globalArticleList, params })
const feedlArticleList = async () => get({ url: URL.feedlArticleList })
const tagList = async () => get({ url: URL.tagList })
const createArticle = async (article: IArticle) => post({ url: URL.createArticle, data: { article } })
const delArticle = async (slug: string) => del({ url: `/articles/${slug}` })
const updateArticle = async (slug: string, article: IArticle) => put({ url: `/articles/${slug}`, data: { article } })
const getArticle = async (slug: string) => get({ url: `/articles/${slug}` })
const favoriteArticle = async (slug: string) => post({ url: `/articles/${slug}/favorite` })
const unFavoriteArticle = async (slug: string) => del({ url: `/articles/${slug}/favorite` })
const commentsArticle = async (slug: string) => get({ url: `/articles/${slug}/comments` })
const addCommentsArticle = async (slug: string, data: any) => post({ url: `/articles/${slug}/comments`, data })
const delCommentsArticle = async (slug: string, id: string) => del({ url: `/articles/${slug}/comments/${id}` })

export {
    globalArticleList, feedlArticleList, tagList, createArticle, delArticle, updateArticle
    , getArticle, favoriteArticle, unFavoriteArticle
    , commentsArticle, addCommentsArticle, delCommentsArticle
};