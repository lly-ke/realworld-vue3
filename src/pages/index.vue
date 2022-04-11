<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-for="tab in tabs" :key="tab">
                <div
                  class="nav-link cursor-pointer"
                  @click="currentTab = tab"
                  :class="currentTab === tab ? 'active' : null"
                  >{{ (tab.type === 'tag' ? '# ' : '') + tab.text }}</div
                >
              </li>
            </ul>
          </div>

          <div v-if="articleList.length === 0" class="article-preview">
            No articles are here... yet.
          </div>
          <div v-else class="article-preview" v-for="(article, i) in articleList" :key="i">
            <div class="article-meta">
              <a href="profile.html"><img :src="article?.author?.image" /></a>
              <div class="info">
                <a href="" class="author">{{ article?.author?.username }}</a>
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button
                @click="useFavoriteOrUnFavoriter(article)"
                class="btn btn-sm pull-xs-right"
                :class="article.favorited ? 'btn-primary' : 'btn-outline-primary'"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <router-link :to="`/article/${article.slug}`" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </router-link>
            <ul class="tag-list float-right"
              ><li
                :key="tag"
                v-for="tag in article.tagList"
                class="tag-default tag-pill tag-outline"
                >{{ tag }}</li
              ></ul
            >
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <span
                class="tag-pill tag-default cursor-pointer"
                @click="showArticleListByTag(tag)"
                v-for="tag in tagList"
                :key="tag"
                >{{ tag }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { Ref, watchEffect } from 'vue'
import { globalArticleList, feedlArticleList, tagList as tagListApi } from '@/api/article'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useFavoriteOrUnFavoriter } from './article/use/favorite'

let userStore = useUserStore()

let { isLogin } = storeToRefs(userStore)

let articleList: Ref<any> = ref([])
let tagList: Ref<any> = ref([])
let headTabs: Ref<any> = ref([])
let tagTabs: Ref<any> = ref([])
let tabs: Ref<any> = computed(() => [...headTabs.value, ...tagTabs.value])
let currentTab: Ref<any> = ref([])

const defaultAvaiableList: any = [
  { text: 'Your Feed', type: 'head' },
  { text: 'Global Feed', type: 'head' },
]

const showArticleListByTag = (tag: string) => {
  let t = { text: tag, type: 'tag' }
  tagTabs.value = [t]
  currentTab.value = t
}

watchEffect(() => {
  if (isLogin.value) {
    headTabs.value = defaultAvaiableList
    currentTab.value = defaultAvaiableList[0]
  } else {
    headTabs.value = [defaultAvaiableList[1]]
    currentTab.value = defaultAvaiableList[1]
  }
})

watchEffect(async () => {
  if (currentTab.value.text === defaultAvaiableList[0].text) {
    articleList.value = (await feedlArticleList()).data.articles
  } else if (currentTab.value.text === defaultAvaiableList[1].text) {
    articleList.value = (await globalArticleList()).data.articles
  } else {
    articleList.value = (await globalArticleList({ tag: currentTab.value.text })).data.articles
  }
})

tagList.value = (await tagListApi()).data.tags
</script>