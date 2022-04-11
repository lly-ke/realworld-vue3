<script setup lang="ts"></script>

<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link" :class="{ active: isCurrentPageByPath('/') }" to="/"
            >Home</router-link
          >
        </li>
        <template v-if="isLogin">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: isCurrentPageByPath('/article/editor') }"
              to="/article/editor"
              ><i class="ion-compose"></i>&nbsp;New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: isCurrentPageByPath('/user/settings') }"
              to="/user/settings"
              ><i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/user/profile/${userInfo.username}`" class="nav-link">
              <img class="float-left mr-1 h-6 rounded-full" :src="userInfo.image" />
              {{ userInfo.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link cursor-pointer" @click="logout">Logout</a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: isCurrentPageByPath('/user/login') }"
              to="/user/login"
              >Sign in</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: isCurrentPageByPath('/user/register') }"
              to="/user/register"
              >Sign up</router-link
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

let route = useRoute()
let router = useRouter()

let userStore = useUserStore()
// let userInfo = computed(() => userStore.userInfo)
// let isLogin = computed(() => userStore.isLogin)
let { isLogin, userInfo } = storeToRefs(userStore)

/**
 * @description 传入pageName判断当前页面是否是该页面
 */
const isCurrentPageByPath = (pageName: string) =>
  route.matched.length > 0 && route.matched[0].path === pageName

function logout() {
  userStore.logout().then(() => {
    router.push('/')
  })
}
</script>
<style lang="less"></style>
