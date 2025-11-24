<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          link
          :active="isActive(item.to)"
          @click="navigate(item.to)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuItems = [
  { title: 'Dashboard', to: '/dashboard' },
  { title: 'Page 1', to: '/page1' },
  { title: 'Page 2', to: '/page2' },
]

function navigate(to: string) {
  if (route.path !== to) {
    router.push(to)
  }
}

function isActive(to: string) {
  return route.path === to
}
</script>

<style scoped>
.v-application {
  min-height: 100vh;
}
</style>
