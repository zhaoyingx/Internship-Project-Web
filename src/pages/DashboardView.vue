<template>
  <!-- ...existing code... -->
  <v-container>
    <v-col>
      <v-row>
        <v-card class="mx-auto" max-width="344" hover>
          <v-card-item>
            <v-card-title> Card title </v-card-title>

            <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </v-card-text>
        </v-card>
        <v-card class="mx-auto" max-width="344" hover>
          <v-card-item>
            <v-card-title> Card title </v-card-title>

            <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </v-card-text>
        </v-card>
        <v-card class="mx-auto" max-width="344" hover>
          <v-card-item>
            <v-card-title> Card title </v-card-title>

            <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </v-card-text>
        </v-card>
      </v-row>
      <v-row>
        <!-- 这里展示两个图表 -->
        <v-col cols="12" md="6">
          <div ref="chartRef1" style="width: 100%; height: 400px"></div>
        </v-col>
        <v-col cols="12" md="6">
          <div ref="chartRef2" style="width: 100%; height: 400px"></div>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
// import * as echarts from 'echarts'
import { get } from '@/services/api'

const chartRef1 = ref<HTMLDivElement | null>(null)
const chartRef2 = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  // 测试接口请求
  try {
    const params = {
      year: '2023',
      university: 'National University of Singapore',
    }
    const testData = await get('/graduate-employment', params)
    console.log('response daata:', testData)
  } catch (error) {
    console.error('error request:', error)
  }


})

onBeforeUnmount(() => {
})
</script>
