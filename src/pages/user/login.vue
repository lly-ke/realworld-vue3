<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="">Need an account?</a>
          </p>

          <ul class="error-messages">
            <template v-for="(arr, key) in errors" :key="key">
              <li v-for="val in arr" :key="val"> {{ key }} : {{ val }}</li>
            </template>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.email"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.password"
                type="password"
                placeholder="Password"
                @keydown.enter="login"
              />
            </fieldset>
            <button @click="login" class="btn btn-lg btn-primary pull-xs-right"> Sign in </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login as loginApi } from '@/api/user'
import { useUserStore } from '@/store'

let userStore = useUserStore()
let router = useRouter()

let user = reactive({
  email: '5CPS',
  password: '秒速五厘米',
})
let errors = ref({})

// 调用用户登陆接口
function login() {
  return loginApi({ user: user }).then((res) => {
    console.log('res', res)
    if (!res.data.errors) {
      // 登陆成功
      userStore.setLoginData(res.data.user).then(() => {
        router.push('/')
      })
    } else {
      // 登陆失败
      errors.value = res.data.errors
      // 显示错误信息
    }
  })
}
</script>