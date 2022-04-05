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
              <li class="nav-item" v-if="isLogin">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="(article, i) in articleList" :key="i">
            <div class="article-meta">
              <a href="profile.html"><img :src="article?.author?.image" /></a>
              <div class="info">
                <a href="" class="author">{{ article?.author?.username }}</a>
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </a>
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

            <div class="tag-list" v-for="tag in tagList" :key="tag">
              <a href="" class="tag-pill tag-default">{{ tag }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { Ref } from 'vue'
import { globalArticleList, tagList as tagListApi } from '@/api/article'
import { useUserStore } from '@/store'

let userStore = useUserStore()
let isLogin = computed(() => userStore.isLogin)

let articleList: Ref<any> = ref([])
let tagList: Ref<any> = ref([])

onMounted(async () => {
  tagList.value = (await tagListApi()).data.tags
  articleList.value = (await globalArticleList()).data.articles
})
</script>