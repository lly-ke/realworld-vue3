<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userInfo.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="userInfo.username"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="userInfo.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userInfo.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userInfo.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button @click="saveUserInfo" class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout"> Or click here to logout. </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserInfo, updateUserInfo } from '@/api/user'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'

let router = useRouter()
let userStore = useUserStore()

let userInfo = ref({})

userInfo.value = (await getUserInfo()).data.user

const saveUserInfo = async () => {
  updateUserInfo({
    "user": userInfo.value
  }).then(res => {
    userStore.setLoginData(res.data.user)
    router.push(`/user/profile/${res.data.user.username}`)
  })
}
const logout = () => {
  userStore.logout().then(() => {
    router.push('/')
  })
}
</script>
