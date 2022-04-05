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
        <li class="nav-item">
          <a class="nav-link"> <i class="ion-compose"></i>&nbsp;New Article </a>
        </li>
        <li class="nav-item">
          <a class="nav-link"> <i class="ion-gear-a"></i>&nbsp;Settings </a>
        </li>
        <template v-if="isLogin">
          <li class="nav-item">
            <div class="nav-link">
              <img class="float-left mr-1 h-6 rounded-full" :src="userInfo.image" />
              {{ userInfo.username }}
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link cursor-pointer" @click="logout">Logout</a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: isCurrentPageByPath('/login') }"
              to="/login"
              >Sign in</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: isCurrentPageByPath('/register') }"
              to="/register"
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
import { useRoute } from 'vue-router'

let route = useRoute()

let userStore = useUserStore()
let userInfo = computed(() => userStore.userInfo)
let isLogin = computed(() => userStore.isLogin)

/**
 * @description 传入pageName判断当前页面是否是该页面
 */
const isCurrentPageByPath = (pageName: string) =>
  route.matched.length > 0 && route.matched[0].path === pageName

function logout() {
  userStore.$reset()
}
</script>
<style lang="less"></style>
