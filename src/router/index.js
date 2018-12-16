import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
//登录
// import login from '@/components/login'
// * page 
import page from '@/components/common/page'
//首页
import home from '@/components/home/home'
//案例
import cases from '@/components/cases/cases'
//用户管理
import user from '@/components/user/user'
//添加权限
import addrole from '@/components/user/addrole'
//权限
import role from '@/components/role/role'
//项目管理
import project from '@/components/project/project'
//个人中心
import centers from '@/components/user/center'
//展示页面  shows
import shows from '@/components/show'
//管理
import manage from '@/components/manage/manage'
//welcome
import welcome from '@/components/common/welcome'
//设置
import setting from '@/components/setting/setting'
// 设置 children[]
import logoset from '@/components/setting/companymsg/logoset'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/components/login'], resolve)
    },
    {
      path: '/page',
      component: resolve => require(['@/components/common/page'], resolve),
      children: [{
        path: 'welcome',
        component:welcome
      }, {
        path: 'home',
        component: home
      }, {
        path: 'cases',
        component: cases
      }, {
        path: 'user',
        component: user
      }, {
        path: 'addrole',
        component: addrole
      }, {
        path: 'role',
        component: role
      },{
        path:'project',
        component:project
      },{
        path:'manage',
        component:manage
      },
      // 个人中心
      {
        path:'centers',
        component:centers
      },
      //展示
      {
        path:'shows',
        component:shows
      },
      {
        path:'setting',
        component:setting,
        children:[
        {
          path:'/logoset',
          component:logoset
        }
      ]
      }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['@/components/login'], resolve)
    }
  ]
})



// loginMSG
let arrURL = [];
function getUrl() {
  if (localStorage.getItem('setIn')) {
    let obj = JSON.parse(localStorage.getItem('setIn')).menu;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].children) {
        for (let j = 0; j < obj[i].children.length; j++) {
          arrURL.push(obj[i].children[j].url)
        }
      } else {
        arrURL.push(obj[i].url)
      }
    }
  }
}
router.beforeEach((to, from, next) => {
  console.log(to.path)
  getUrl()
  if(to.path == '/' || 
     to.path == '/page/setting' || 
     to.path == '/login' || 
     to.path == '/page/centers' || 
     to.path == '/page/welcome' || 
     to.path == '/page/shows' ||
     to.path == '/page/manage' ||
     to.path == '/page/setting/logoset'
     ){
    return next()
  }
  if(!localStorage.getItem('setIn')){
    return next({path:'login'})
    
  }
  if(arrURL.indexOf(to.path) != -1){
    return next()
  } else{
    return next(false)
  }
})


export default router