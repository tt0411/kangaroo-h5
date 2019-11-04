<template>
  <common-layout>
      <div slot="content">
          <div class="content">
               <van-field v-model="oldPwd"  required clearable label="旧密码" maxlength="18" placeholder="请填写旧密码"/>
               <van-field v-model="newPwd"  required clearable label="新密码" maxlength="18" placeholder="请填写新密码"/>
               <van-field v-model="reNewPwd"  required clearable label="确认新密码" maxlength="18" placeholder="请填写确认新密码"/>
          <div class="changePwd">
            <van-button color="#12C3DF" round  size="large"  @click="changePwd">修改密码</van-button>
          </div>
      </div> 
    </div>
  </common-layout>
</template>

<script>
import {Toast} from 'vant'
export default {
    data() {
        return {
            oldPwd: '',
            newPwd: '',
            reNewPwd: '',
        }
    },
    methods: {
        changePwd(){
            if(!this.oldPwd) {
                Toast('请填写旧密码')
            }else if(!this.newPwd) {
                Toast('请填写新密码')
            }else if(!this.reNewPwd) {
                Toast('请填写确认新密码')
            }else if(this.newPwd !== this.reNewPwd) {
                Toast('两次密码输入不一致')
            }else{
                
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.content{
     .changePwd{
       margin-top: 10px; 
       width: 80%;
       margin-left: 10%;
    }
}
   
</style>