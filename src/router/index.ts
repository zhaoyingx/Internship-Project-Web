import { createRouter, createWebHistory } from 'vue-router'

const DashboardLayout = () => import('@/LayoutView.vue')
const Dashboard = () => import('@/pages/DashboardView.vue')
const PageOne = () => import('@/pages/PageOneView.vue')
const PageTwo = () => import('@/pages/PageTwoView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'page1',
          component: PageOne,
        },
        {
          path: 'page2',
          component: PageTwo,
        },
      ],
    },
  ],
})

export default router
