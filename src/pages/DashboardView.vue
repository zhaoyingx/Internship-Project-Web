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
import * as echarts from 'echarts'

const chartRef1 = ref<HTMLDivElement | null>(null)
const chartRef2 = ref<HTMLDivElement | null>(null)
let chartInstance1: echarts.ECharts | null = null
let chartInstance2: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef1.value) {
    chartInstance1 = echarts.init(chartRef1.value)
    chartInstance1.setOption({
      title: { text: 'ECharts 示例柱状图' },
      tooltip: {},
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E', 'F'],
      },
      yAxis: {},
      series: [
        {
          name: '人数',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    })
  }
  if (chartRef2.value) {
    chartInstance2 = echarts.init(chartRef2.value)
    chartInstance2.setOption({
      title: { text: 'ECharts 示例折线图' },
      tooltip: {},
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {},
      series: [
        {
          name: '访问量',
          type: 'line',
          data: [150, 230, 224, 218, 135, 147, 260],
        },
      ],
    })
  }
})

onBeforeUnmount(() => {
  if (chartInstance1) {
    chartInstance1.dispose()
  }
  if (chartInstance2) {
    chartInstance2.dispose()
  }
})
</script>
