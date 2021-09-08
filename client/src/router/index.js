import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Shot from '@/components/Shot'
import newSlider from '@/components/newSlider'
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/Shot',
      name:'Shot',
      component:Shot,
    },
    {
      path:'/newSlider',
      name:'newSlider',
      component:newSlider,
    },
  ]
})
