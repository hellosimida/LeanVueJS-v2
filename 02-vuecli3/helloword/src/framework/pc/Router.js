import PCRoutes from '@/router/pc'

export default [
    {   // 入口页面
        path: '/',
        component: () => import('@/views/pc/Main.vue'),
        children: [].concat(PCRoutes), // 此处将两个系统路由合并
    },
    {   // 404页面
        path: '*',
        component: () => import('@/views/pc/404.vue'),
        meta: {
            unrequiresLogin: true,
        }
    },
]
