<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <a href=""><img :src="article?.author?.image" /></a>
          <div class="info">
            <a href="" class="author">{{ article?.author?.username }}</a>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <template v-if="article?.author?.username === userInfo?.username">
            <span ng-show="$ctrl.canModify" class="ng-scope">
              <a
                class="btn btn-outline-secondary btn-sm mr-2"
                ui-sref="app.editor({ slug: $ctrl.article.slug })"
                href="#/editor/aad-35234"
              >
                <i class="ion-edit"></i> Edit Article
              </a>

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
              {{
                `${article?.author?.following ? 'Unfollow' : 'Follow'} ${article?.author?.username}`
              }}
            </button>
            &nbsp;&nbsp;
            <button
              @click="favoriteOrUnFavoriter"
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
        <div class="article-meta">
          <a href=""><img :src="article?.author?.image" /></a>
          <div class="info">
            <a href="" class="author">{{ article?.author?.username }}</a>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <button
            @click="followOrUnfollow"
            class="btn btn-sm"
            :class="article?.author?.following ? 'btn-secondary' : 'btn-outline-secondary'"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            {{
              `${article?.author?.following ? 'Unfollow' : 'Follow'} ${article?.author?.username}`
            }}
          </button>
          &nbsp;&nbsp;
          <button
            @click="favoriteOrUnFavoriter"
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
        </div>
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
              <a href="" class="comment-author">
                <img :src="comment?.author?.image" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">{{ comment?.author?.username }}</a>
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
import {
  getArticle,
  favoriteArticle,
  unFavoriteArticle,
  commentsArticle,
  addCommentsArticle,
  delCommentsArticle,
  delArticle as delArticleApi,
} from '@/api/article'
import { follow, unFollow } from '@/api/user'
import { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

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

const followOrUnfollow = () => {
  // 判断没有登陆跳转到登陆页面
  if (!isLogin.value) {
    router.push('/user/login')
    return
  }
  if (article.value?.author?.following) {
    unFollow(article.value.author.username).then(() => {
      article.value.author.following = false
    })
  } else {
    follow(article.value.author.username).then(() => {
      article.value.author.following = true
    })
  }
}

//喜欢文章或取消喜欢文章
const favoriteOrUnFavoriter = () => {
  // 判断没有登陆跳转到登陆页面
  if (!isLogin.value) {
    router.push('/user/login')
    return
  }
  if (article.value?.favorited) {
    unFavoriteArticle(article.value.slug).then(() => {
      article.value.favorited = false
      article.value.favoritesCount--
    })
  } else {
    favoriteArticle(article.value.slug).then(() => {
      article.value.favorited = true
      article.value.favoritesCount++
    })
  }
}

// 删除文章
const delArticle = () => {
  delArticleApi(slug).then(() => {
    router.push('/')
  })
}

onMounted(async () => {
  article.value = (await getArticle(slug)).data.article
  comments.value = (await commentsArticle(slug as string)).data.comments
})
</script>