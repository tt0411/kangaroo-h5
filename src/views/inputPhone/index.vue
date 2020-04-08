<template>
  <common-layout>
      <div slot="content">
          <div class="content">
              <div class="box">
                <div class="user">
                    <van-field  v-model="phone" label="手机号" maxlength="11" type="number" :border="false" :error-message="phoneErrorMsg"  size="large"  placeholder="请填写手机号" :clearable="true" class="input"></van-field>
                </div>
                <div class="code" v-if="showCode">
                    <van-field v-model="code" center clearable maxlength="6" label="短信验证码" class="input" placeholder="请输入验证码">
                    <template #button>
                        <van-button size="small" color="#12C3DF" :disabled="!canClick" @click="sendSms">{{codeTips}}</van-button>
                    </template>
                    </van-field>
                </div>
               </div>
          <div class="toSubmit">
            <van-button color="#12C3DF" round  size="large"  @click="toSubmit" :disabled="isSubmit">下一步</van-button>
          </div>
      </div> 
    </div>
  </common-layout>
</template>

<script>
import {Toast} from 'vant'
import { getSmsCode } from '../../api/global'
import { decryptCode } from '../../utils/utils'
export default {
    data() {
        return {
            phone: '',
            code: '',
            isSubmit: true,
            showCode: false,
            phoneErrorMsg: '',
            canClick: true,
            codeTips: '获取验证码',
            rspCode: '',
            type: '', // 1-代表忘记密码 2-代表注册
        }
    },
    created() {
        this.type = this.$route.query.type;
    },
    methods: {
        sendSms() {
            if (this.canClick === true) {
               this.canClick = false
               let time = 60
               const params = {
                 phone: this.phone,
               }
                getSmsCode(params).then(rsp => { 
                    Toast(rsp.msg)
                    if(rsp.code === 200) { 
                      this.codeTips = '已发送(60)' 
                      this.rspCode = rsp.smsCode 
                    }
                })
               let timer = setInterval(()=>{
                 time--
                 this.codeTips = '已发送(' + time + ')'
                 if (time === 0) {
                   clearInterval(timer)
                   this.canClick = true
                   this.codeTips = '获取验证码'
                 }
               }, 1000)
             }
        },
        toSubmit(){
              if(this.type == 1) {
                   this.$router.push({ path: "/resetPwd", query: { phone: this.phone } });
               }else {
                    this.$router.push({ path: "/register", query: { phone: this.phone } });
               }
        //    if(decryptCode(this.rspCode) === this.code) {
        //        if(this.type == 1) {
        //            this.$router.push({ path: "/resetPwd", query: { phone: this.phone } });
        //        }else {
        //             this.$router.push({ path: "/register", query: { phone: this.phone } });
        //        }
             
        //    }else {
        //        Toast.fail('验证码不正确')
        //    }
        }
    },
    watch: {
        phone(newVal, oldVal) {
            if(!(/^1[3456789]\d{9}$/.test(newVal))){
                this.phoneErrorMsg = '手机号不合法' 
                this.showCode = false
            }else{
                this.showCode = true
                this.phoneErrorMsg = '' 
                this.isSubmit = true
            }
        },
        code(newVal, oldVal) {
            if(newVal.length === 6) {
                this.isSubmit = false
            }else {
                this.isSubmit = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
  
     .toSubmit{
       margin-top: 20px; 
       width: 80%;
       margin-left: 10%;
    }
    .box{
            margin-top: 10%;
            width: 90%;
            display: flex;
            flex-direction: column;
            margin-left: 5%;
            .input{
                caret-color: #12C3DF;
                font-size: 16px;
                border-bottom: 1px solid #e2e2e2;
            }
        }
}
   
</style>