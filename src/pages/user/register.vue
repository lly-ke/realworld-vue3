<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>

          <ul class="error-messages">
            <template v-for="(arr, key) in errors" :key="key">
              <li v-for="val in arr" :key="val"> {{ key }} : {{ val }}</li>
            </template>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                @keydown.enter="register"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" @click="register">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { register as registerApi } from '@/api/user'
import { IResponse, IUser } from '@/api/types'
import { AxiosResponse } from 'axios'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/index'
import { useRouter } from 'vue-router'

let router = useRouter()
let userStore = useUserStore()
let user = reactive({
  username: null,
  password: null,
  email: null,
})
let errors = ref({})

function register() {
  registerApi({
    user: {
      password: user.password,
      username: user.username,
      email: user.email,
    },
  })
    .then(function (res: AxiosResponse<any>) {
      if (res.data.errors) {
        errors.value = res.data.errors
      } else {
        userStore.setLoginData(res.data.user)
        router.push('/')
      }
    })
    .catch(function () {
      console.log(arguments)
    })
}
</script>