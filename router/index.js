import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'
import Detail from '@/components/Detail'
Vue.use(Router)
Router.prototype.go = function (a) {
   sessionStorage.isBack = true
  if(a){
    window.history.go(a)
  }else{
    window.history.go(-1)
  }
}
window.addEventListener("popstate", function(e) {
  sessionStorage.isBack = true
}, false);
export default new Router({
      linkActiveClass: 'active', 
  routes: [
      {
      path:'/',
      redirect:'/home'
    },
    {
       path: '/home',
       name: 'Home',
       component: Home,
        meta: {
          keepAlive: true // 需要被缓存
         }
     },
    {
       path: '/detail',
       name: 'Detail',
       component: Detail,
       meta: {
        keepAlive: false
       }
    },
    {
       path: '/list',
       name: 'List',
       component: List,
        meta: {
          keepAlive: true // 需要被缓存
         }
  
    },

  ]
})
