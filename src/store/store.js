import Vue from 'vue'
import Vuex from 'vuex'
import router from './../router/index'
import { DIYtoast } from './../utils/tool'

import { login } from './../utils/baseUrl'



const state = {
  loginMSG:[],
  shows:'',
  logo:{},
  menus:false,
}

const getters = {
  //主页路由菜单
  ROUTESETTING(state){
    let MENU = [];
    //F5之后 存在menu => 返回菜单
    if(state.loginMSG.menu){
      for(let i = 0;i < state.loginMSG.menu.length;i++){
        let arr = [];
        if(state.loginMSG.menu[i].children){
          arr.push([state.loginMSG.menu[i].label,state.loginMSG.menu[i].icon])
          for(let j = 0;j < state.loginMSG.menu[i].children.length;j++){
            arr.push([state.loginMSG.menu[i].children[j].label,state.loginMSG.menu[i].children[j].url])
          }
        } else{
          arr.push([state.loginMSG.menu[i].label,state.loginMSG.menu[i].icon,state.loginMSG.menu[i].url])
        }
        MENU.push(arr)
      }
      return MENU
    }
  },
  //登录昵称
  USERMSG(state){
    if(state.loginMSG.user){
       return state.loginMSG.user[0].name
    }
   
  },
  //登录信息
  SETUSER(state){
    if(state.loginMSG.user){
      return state.loginMSG.user[0]
   }
  },
}

const mutations = {
  //登录
  LOGIN(state,loginMSG){
    state.loginMSG = loginMSG;
    localStorage.setItem('setIn',JSON.stringify(loginMSG))
  },
  //退出登录
  OUTLOGIN(state){
    router.push('/login');
    state.loginMSG = [];
    localStorage.clear()
    
  },
  //展示
  SHOWS(state,res){
    state.shows = res;
  },
  //退出展示
  OUTSHOW(){
    state.shows = ''
  },
  //获取logo 公司昵称
  getLogos(state,msg){
    state.logo = msg;
  },
  //开关菜单
  SHOWMEUN(state,BEO) {
    state.menus = BEO
  }
}

const actions = {
  //登录
  async login_user(mtx,obj){
    login(obj)
    .then(res=>{




      if(res.status === 200){
        // console.log(res)
        if(res.data.code === 500){
          DIYtoast(res.data.msg)
        }
        if(res.data.code === 402){
          DIYtoast(res.data.msg)
        }
        if(res.data.code === 200){
          DIYtoast(res.data.msg);
          // console.log(233)
          mtx.commit('LOGIN',res.data.data);
          setTimeout(()=>{
            router.push('/page/welcome')
          },1000)
        }
        // mtx.commit('LOGIN',res)
      }
    })
  },
  //退出登录
  async outLogin(mtx){
    mtx.commit('OUTLOGIN')
  },
  //刷新后存储数据
  async Floading(mtx,obj) {
    // console.log(obj)
    mtx.commit('LOGIN',obj)
  }
}

Vue.use(Vuex);
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
