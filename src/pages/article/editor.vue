<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <template v-for="(arr, key) in errors" :key="key">
              <li v-for="val in arr" :key="val"> {{ key }} : {{ val }}</li>
            </template>
          </ul>

          <form>
            <button style="display: none" />
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  @keydown.enter="addTag"
                  v-model="tagInputText"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list">
                  <span v-for="(tag, i) in article.tagList" :key="i" class="tag-pill tag-default">
                    <i @click="article.tagList.splice(i, 1)" class="ion-close-round"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button @click.self="saveArticle" class="btn btn-lg btn-primary pull-xs-right">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup >
import { createArticle, getArticle, updateArticle } from '@/api/article'
import { IArticle } from '@/api/article/types'
import { useRouter, useRoute } from 'vue-router'
import { onBeforeMount, Ref } from 'vue'

let route = useRoute()
let router = useRouter()

let article: Ref<IArticle> = ref({
  title: '',
  description: '',
  body: '',
  tagList: [],
})
let tagInputText = ref('')
let errors = ref([] as any)

let slug = route.params.slug as string

if (slug) {
  getArticle(slug).then((res) => {
    article.value = res.data.article
    console.log(article)
  })
}

const addTag = () => {
  if (tagInputText.value) {
    article.value.tagList.push(tagInputText.value)
    tagInputText.value = ''
  }
}

const saveArticle = () => {
  if (slug) {
    updateArticle(slug, article.value).then((res) => {
      if (res.data.errors) {
        errors.value = res.data.errors
      } else {
        router.push(`/article/${res.data.article.slug}`)
      }
    })
  } else {
    createArticle(article.value).then((res: any) => {
      if (res.data.errors) {
        errors.value = res.data.errors
      } else {
        router.push(`/article/${res.data.article.slug}`)
      }
    })
  }
}
</script>