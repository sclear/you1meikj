<template>
  <div class="login">
      <div class="login_continear">
          <div class="title">Login</div>
          <div class="login_detail">
              <input v-model="name" placeholder="User name" type="text">
              <input v-model="pass" placeholder="••••••••" type="password">
          </div>
          <div @click="Login" class="btn">Sign in</div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { login } from './../utils/baseUrl.js'
export default {
  name:'login',
  data() {
    return {
        name:'',
        pass:''
    }
  },
  mounted() {
      localStorage.clear()
  },
  methods: {
      ...mapActions(['login_user']),
      Login() {
        if(this.name === '' && this.pass === ''){
            this.$DIY('请确认用户名和密码')
            return
        }
        let obj = {
            user:this.name,
            pwd:this.pass
        }

        this.login_user(obj)
      }
  }
}
</script>

<style lang='less' scoped >
@keyframes login{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
.login{
    width:100%;
    height:100%;
    background: url('./../assets/login/bg.jpg') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login_continear{
        height:417px;
        width:470px;
        background: #F2F2F2;
    opacity: 0;
    animation: login 1.5s linear forwards;
        .title{
            height: 95px;
            width:100%;
            background-color: #6D4A70;
            font-size: 24px;
            line-height: 95px;
            padding-left: 15px;
            box-sizing: border-box;
            color:white;
        }
        .login_detail{
            input{
                width:440px;
                height:46px;
                background: #f0eef0;
                color:#9E61A3;
                border:none;
                outline: none;
                margin-left: 15px;
                border:2px solid #eae8ea;
                font-size: 20px;
                padding:10px 0 10px 20px;
                box-sizing: border-box;
                margin-top: 15px;
            }
            input:first-child{
                margin-top: 50px;
            }
        }
        .btn{
            height:49px;
            width:142px;
            color:#fff;
            background:#6C496F;
            border-radius: 8px;
            line-height: 49px;
            text-align:center;
            margin:60px 0 0 15px;
            border:2px solid #6C496F;
            transition: all .4s linear;
            cursor: pointer;
            &:hover{
                background: #fff;
                color:#6C496F;
                &::-webkit-input-placeholder{
                    color:white;
                }
            }
        }
    }
}
</style>
