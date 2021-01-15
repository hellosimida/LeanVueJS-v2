import MobileRoutes from '@/router/mobile'

export default [
  {   // 入口页面
    path: '/',
    component: () => import('@/views/mobile/Main.vue'),
    children: [].concat(MobileRoutes), // 此处将两个系统路由合并
  },
  {   // 404页面
    path: '*',
    component: () => import('@/views/mobile/404.vue'),
    meta: {
      unrequiresLogin: true,
    }
  },
]
