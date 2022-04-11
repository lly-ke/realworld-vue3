<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userInfo.image" class="user-img" />
            <h4>{{ userInfo.username }}</h4>
            <p>{{ userInfo.bio }}</p>
            <button
              v-if="userInfo.username === userInfoStore.username"
              @click="router.push('/user/settings')"
              class="btn btn-sm btn-outline-secondary action-btn"
              ><i class="ion-gear-a"></i> Edit Profile Settings </button
            ><button
              v-else
              @click="useFollowOrUnfollow(toRefs(userInfo).following, userInfo.username)"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ `${userInfo.following ? 'Unfollow' : 'Follow'} ${userInfo.username}` }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-for="tab in tabs" :key="tab" @click="currentTab = tab">
                <span
                  class="nav-link cursor-pointer"
                  :class="tab === currentTab ? 'active' : null"
                  >{{ tab }}</span
                >
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="(article, i) in articles" :key="article.slug">
            <div class="article-meta">
              <router-link :to="`/user/profile/${article.author?.username}`"
                ><img :src="article?.author?.image"
              /></router-link>
              <div class="info">
                <a href="" class="author">{{ article?.author?.username }}</a>
                <span class="date">{{ article?.createdAt }}</span>
              </div>
              <button
                class="btn btn-sm pull-xs-right"
                @click="useFavoriteOrUnFavoriter(article)"
                :class="article.favorited ? 'btn-primary' : 'btn-outline-primary'"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <router-link :to="`/article/${article.slug}`" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="tag in article.tags"
                  :key="tag"
                  >{{ tag }}</li
                >
              </ul>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { getUserProfile } from '@/api/user'
import { globalArticleList } from '@/api/article'
import { useUserStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { useFollowOrUnfollow } from '@/pages/user/use/follwing'
import { useFavoriteOrUnFavoriter } from '@/pages/article/use/favorite'

let defaultTabs = ['My Articles', 'Favorited Articles']
let tabs = ref(defaultTabs)
let currentTab = ref('My Articles')
let router = useRouter()
let route = useRoute()
let userStore = useUserStore()

let userInfoStore = userStore.userInfo
let username = route.params.username as string
let articles: any = ref([])

watchEffect(async () => {
  if (currentTab.value === defaultTabs[0]) {
    articles.value = (await globalArticleList({ author: username })).data.articles
  } else {
    articles.value = (await globalArticleList({ favorited: username })).data.articles
  }
})

let userInfo = ref((await getUserProfile(username)).data.profile)
</script>