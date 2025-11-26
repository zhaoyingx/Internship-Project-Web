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
import { get } from '@/services/api'

const chartRef1 = ref<HTMLDivElement | null>(null)
const chartRef2 = ref<HTMLDivElement | null>(null)
let chartInstance1: echarts.ECharts | null = null
let chartInstance2: echarts.ECharts | null = null

// 定义数据类型
interface EmploymentData {
  school: string
  employment_rate_overall: string | number
}

// 初始化柱状图配置
const barChartOption: echarts.EChartsOption = {
  title: {
    text: 'Rate-1',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: '{b}: {c}%',
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      rotate: 45,
      interval: 0,
    },
  },
  yAxis: {
    type: 'value',
    name: 'rate (%)',
    min: 0,
    max: 100,
  },
  series: [
    {
      name: 'rate',
      type: 'bar',
      data: [],
      itemStyle: {
        color: '#5470c6',
      },
    },
  ],
  grid: {
    bottom: 100,
  },
}

// 初始化折线图配置
const lineChartOption: echarts.EChartsOption = {
  title: {
    text: 'Rate-2',
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: {c}%',
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      rotate: 45,
      interval: 0,
    },
  },
  yAxis: {
    type: 'value',
    name: 'rate (%)',
    min: 0,
    max: 100,
  },
  series: [
    {
      name: 'rate',
      type: 'line',
      data: [],
      smooth: true,
      itemStyle: {
        color: '#91cc75',
      },
      lineStyle: {
        width: 2,
      },
    },
  ],
  grid: {
    bottom: 100,
  },
}

// 处理数据：合并相同学校并计算平均值
function processEmploymentData(data: EmploymentData[]) {
  const schoolMap = new Map<string, { total: number; count: number }>()

  // 统计每个学校的总和和数量
  data.forEach((item) => {
    // 将字符串转换为数字
    const rate =
      typeof item.employment_rate_overall === 'string'
        ? parseFloat(item.employment_rate_overall)
        : item.employment_rate_overall

    // 跳过无效数据（NaN 或非数字）
    if (isNaN(rate) || !isFinite(rate)) {
      return
    }

    if (!schoolMap.has(item.school)) {
      schoolMap.set(item.school, { total: 0, count: 0 })
    }
    const schoolData = schoolMap.get(item.school)!
    schoolData.total += rate
    schoolData.count += 1
  })

  const schools: string[] = []
  const rates: number[] = []

  schoolMap.forEach((value, school) => {
    schools.push(school)
    rates.push(Number((value.total / value.count).toFixed(2)))
  })

  return { schools, rates }
}

onMounted(async () => {
  // 初始化图表并设置初始配置
  if (chartRef1.value) {
    chartInstance1 = echarts.init(chartRef1.value)
    chartInstance1.setOption(barChartOption)
  }
  if (chartRef2.value) {
    chartInstance2 = echarts.init(chartRef2.value)
    chartInstance2.setOption(lineChartOption)
  }

  // 请求数据并更新图表
  try {
    const params = {
      year: '2023',
      university: 'National University of Singapore',
    }
    const testData = await get('/graduate-employment', params)

    // 提取数据数组
    let dataArray: EmploymentData[] = []
    if (Array.isArray(testData)) {
      dataArray = testData
    } else if (testData && typeof testData === 'object') {
      if ('data' in testData && Array.isArray(testData.data)) {
        dataArray = testData.data as EmploymentData[]
      } else if ('Data' in testData && Array.isArray(testData.Data)) {
        dataArray = testData.Data as EmploymentData[]
      }
    }

    if (dataArray.length > 0) {
      // 处理数据
      const { schools, rates } = processEmploymentData(dataArray)

      // 只更新数据部分
      if (chartInstance1) {
        chartInstance1.setOption({
          xAxis: {
            data: schools,
          },
          series: [
            {
              data: rates,
            },
          ],
        })
      }

      if (chartInstance2) {
        chartInstance2.setOption({
          xAxis: {
            data: schools,
          },
          series: [
            {
              data: rates,
            },
          ],
        })
      }
    }
  } catch (error) {
    console.error('error request:', error)
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
