<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div>
            {{ article.body }}
          </div>
          <ul class="tag-list">
            <li v-for="tag in article.tagList" :key="tag" class="tag-default tag-pill tag-outline">
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form" v-if="isLogin">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="commentInputText"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="userInfo.image" class="comment-author-img" />
              <button @click="addComment" class="btn btn-sm btn-primary"> Post Comment </button>
            </div>
          </form>
          <p v-else>
            <router-link to="/user/login">Sign</router-link> in or
            <router-link to="/user/register">sign up</router-link> to add comments on this article.
          </p>

          <div class="card" v-for="comment in comments" :key="comment">
            <div class="card-block">
              <p class="card-text">{{ comment.body }}</p>
            </div>
            <div class="card-footer">
              <router-link :to="`/user/profile/${comment.author?.username}`" class="comment-author">
                <img :src="comment?.author?.image" class="comment-author-img" />
              </router-link>
              &nbsp;
              <router-link
                :to="`/user/profile/${comment.author?.username}`"
                class="comment-author"
                >{{ comment?.author?.username }}</router-link
              >
              <span class="date-posted">{{ comment.createdAt }}</span>
              <span class="mod-options">
                <!-- <i class="ion-edit"></i> -->
                <i
                  v-if="comment?.author.username === userInfo?.username"
                  class="ion-trash-a"
                  @click="delComment(comment.id)"
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticle, commentsArticle, addCommentsArticle, delCommentsArticle } from '@/api/article'
import { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import ArticleMeta from './components/ArticleMeta.vue'

let route = useRoute()
let router = useRouter()
let userStore = useUserStore()
let slug = route.params.slug as string

let { isLogin, userInfo } = storeToRefs(userStore)

let comments: Ref<any> = ref([])
let commentInputText: Ref<string> = ref('')
const addComment = () => {
  if (!commentInputText.value) {
    return
  }

  let data = {
    comment: {
      body: commentInputText.value,
    },
  }
  addCommentsArticle(slug, data).then(() => {
    commentsArticle(slug).then((res) => {
      comments.value = res.data.comments
      commentInputText.value = ''
    })
  })
}
const delComment = (id: string) => {
  delCommentsArticle(slug, id).then(() => {
    commentsArticle(slug).then((res) => {
      comments.value = res.data.comments
    })
  })
}

let article: Ref<any> = ref({})

article.value = (await getArticle(slug)).data.article
comments.value = (await commentsArticle(slug as string)).data.comments
</script>