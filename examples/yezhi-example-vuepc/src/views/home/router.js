import '@/style/jjj.scss'
export default {
  tabs: [
    {
      name: 'home',
      path: '/',
      // component: {template: '<div><p>Hello 我是首页信息</p></div>'},
      component: () => import('./src/home.vue')
    }
  ]
}
