const Main = () => import('@/views/mobile/Main.vue')
const Home = () => import('@/views/mobile/home/Home.vue')
const Shop = () => import('@/views/mobile/shop/Shop.vue')
const Storecar = () => import('@/views/mobile/storecar/Storecar.vue')
const User = () => import('@/views/mobile/user/User.vue')
const CategoryDetail = () => import('@/views/mobile/home/CategoryDetail.vue')

export default [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: '',
    component: Main,
    meta:{
      title: '主页'
    }
  },
  {
    path: '/home',
    name: '',
    component: Home,
    children: [{
      path: '/categoryDetail',
      component: CategoryDetail,
      meta: {
        title: '分类详情'
      }
    }],
    meta:{
      title: '首页'
    }
  },
  {
    path: '/shop',
    name: '',
    component: Shop,
    meta:{
      title: '商城'
    }
  },
  {
    path: '/storecar',
    name: '',
    component: Storecar,
    meta:{
      title: '购物车'
    }
  },
  {
    path: '/user',
    name: '',
    component: User,
    meta:{
      title: '我的'
    }
  }
]
