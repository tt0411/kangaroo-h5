<template>
<common-layout>
  <div slot="content">
      <div class="content">
          <div class="top">
              <div class="logo">
                  <van-image round width="60px" height="60px" :src="logo"/>
              </div>
              <div class="title">
                  袋鼠空间
              </div>
          </div>
          <van-divider :style="{ color: '#8a8686', borderColor: '#8a8686', padding: '0 22%' }">
             留存美好记忆
          </van-divider>
          <div class="box">
              <div class="user">
                  <van-field  v-model="user" maxlength="11" type="number" :border="false"  size="large"  :error-message="userErrorMsg" placeholder="请填写账号" :clearable="true" class="input">
                      <van-icon slot="left-icon" name="contact" size="20px" color="#cfcfcf" style="margin-right: 10px;" />
                  </van-field>
              </div>
              <div class="password">
                  <van-field v-model="password" type="password" :border="false" size="large" :error-message="pwdErrorMsg" placeholder="请输入密码"  :clearable="true" class="input">
                      <van-icon slot="left-icon" name="closed-eye" size="20px" color="#cfcfcf" style="margin-right: 10px;" />
                  </van-field>
              </div>
              <div class="login">
                <van-button color="#6190e8" round  size="large" @click="login">登录</van-button>
              </div>
              <div class="bottom">
                     <div class="tips" @click="forgetPwd">
                        <div style="margin-top: -2px;">
                          <span class="tips-content">忘记密码</span>
                        </div>
                        <div>
                          <van-icon name="question" color="#6190e8"/>
                        </div> 
                    </div>
                  <div class="register" @click="register">
                      没有账号，去注册
                  </div>
              </div>
          </div>
      </div>
  </div>
</common-layout>
</template>

<script>
import {Toast} from 'vant'
import { setStorage } from '../../utils/utils'

export default {
    data(){
        return {
            logo: require("../../assets/logo.png"),
            user: '',
            password: '',
            userErrorMsg: '',
            pwdErrorMsg: '',
        }
    },
    methods: {
        login() {
            if(!this.user){
              this.userErrorMsg = '请填写账号'
            }else if(!this.password){
               this.pwdErrorMsg = '请填写密码'
            }else{
                let params ={
                    phone: this.user,
                    password: this.password,
                }
               this.$store.dispatch("user/login", params).then(rsp => {
                   if(rsp.code === 200) {
                        setStorage('token', rsp.token, 1000*3600*24) 
                        this.$router.push('/user')       
                   }else{
                       Toast.fail(rsp.msg)
                   }
               })
            }
        },
        forgetPwd() {
            this.$router.push({ path: "/inputPhone", query: { type: 1 } })
        },
         register() { 
             this.$router.push({ path: "/inputPhone", query: { type: 2 } })
        },
    },
    watch: {
        user(newVal, oldVal){
            if(newVal){
                this.userErrorMsg = ''
            }
        },
        password(newVal, oldVal){
            if(newVal){
                this.pwdErrorMsg = ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .content{
       margin-top: 18%;
        .top{
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-bottom: -20px;
            .title{
                line-height: 60px;
                font-weight: 700;
                font-size: 26px;
                letter-spacing: 5px;
                margin-left: 10px;
            }
        }
        .box{
            margin-top: 10%;
            width: 90%;
            display: flex;
            flex-direction: column;
            margin-left: 5%;
            .input{
                caret-color: #6190e8;
                font-size: 16px;
                border-bottom: 1px solid #e2e2e2;
            }
            .login{
                 margin-top: 10%;
            }
        }
        .bottom{
            margin-top: 5%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 14px;
           .tips{
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-left: 10px;
            .tips-content{
                color: #9c9a9a;
                margin-right: 5px;
            }
        }
            .register{
                color:#6190e8;
                margin-right: 10px;
            }
        }
    }
</style>