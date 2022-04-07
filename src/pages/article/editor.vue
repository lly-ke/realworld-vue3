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
              <button @click.self="createArticle" class="btn btn-lg btn-primary pull-xs-right">
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
import { createArticle as createArticleApi } from '@/api/article'
import { IArticle } from '@/api/article/types'
import { useRouter } from 'vue-router'

let router = useRouter()
let article: IArticle = reactive({
  title: '',
  description: '',
  body: '',
  tagList: [],
})
let tagInputText = ref('')
let errors = ref([] as any)

const addTag = () => {
  if (tagInputText.value) {
    article.tagList.push(tagInputText.value)
    tagInputText.value = ''
  }
}

const createArticle = () => {
  createArticleApi(article).then((res: any) => {
    console.log(res)
    if (res.data.errors) {
      errors.value = res.data.errors
    } else {
      router.push(`/article/${res.data.article.slug}`)
    }
  })
}
</script>