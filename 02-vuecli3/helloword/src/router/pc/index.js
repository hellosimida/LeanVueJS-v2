const Home = () => import('@/views/pc/Main.vue')

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '',
    component: Home,
    meta:{
      title: '首页'
    }
  }
]
