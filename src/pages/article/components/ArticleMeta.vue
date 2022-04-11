<template>
  <div class="article-meta">
    <a href=""><img :src="article?.author?.image" /></a>
    <div class="info">
      <a href="" class="author">{{ article?.author?.username }}</a>
      <span class="date">{{ article.createdAt }}</span>
    </div>
    <template v-if="article?.author?.username === userInfo?.username">
      <span ng-show="$ctrl.canModify" class="ng-scope">
        <router-link
          class="btn btn-outline-secondary btn-sm mr-2"
          :to="`/article/editor/${article.slug}`"
        >
          <i class="ion-edit"></i> Edit Article
        </router-link>

        <button class="btn btn-outline-danger btn-sm" @click="delArticle">
          <i class="ion-trash-a"></i> Delete Article
        </button>
      </span>
    </template>
    <template v-else>
      <button
        @click="followOrUnfollow"
        class="btn btn-sm"
        :class="article?.author?.following ? 'btn-secondary' : 'btn-outline-secondary'"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{ `${article?.author?.following ? 'Unfollow' : 'Follow'} ${article?.author?.username}` }}
      </button>
      &nbsp;&nbsp;
      <button
        @click="useFavoriteOrUnFavoriter(article)"
        class="btn btn-sm"
        :class="article.favorited ? 'btn-primary' : 'btn-outline-primary'"
      >
        <i class="ion-heart"></i>
        &nbsp;
        <span class="counter">{{
          `${article.favorited ? 'Unfavorite Post' : 'Favorite Post'}
                 (${article.favoritesCount})`
        }}</span>
      </button>
    </template>
  </div>
</template>

<script setup>
import { useFavoriteOrUnFavoriter } from '../use/favorite'
import { follow, unFollow } from '@/api/user'
import {
  delArticle as delArticleApi
} from '@/api/article'
import { defineProps } from 'vue'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

let { article } = defineProps(['article'])

let userStore = useUserStore()
let { isLogin, userInfo } = storeToRefs(userStore)
let router = useRouter()

const followOrUnfollow = () => {
  // 判断没有登陆跳转到登陆页面
  if (!isLogin.value) {
    router.push('/user/login')
    return
  }
  if (article?.author?.following) {
    unFollow(article.author.username).then(() => {
      article.author.following = false
    })
  } else {
    follow(article.author.username).then(() => {
      article.author.following = true
    })
  }
}


// 删除文章
const delArticle = () => {
  delArticleApi(article.slug).then(() => {
    router.push('/')
  })
}
</script>