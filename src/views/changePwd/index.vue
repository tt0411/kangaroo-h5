<template>
  <common-layout>
      <div slot="content">
          <div class="content">
            <div class="changebox">
               <van-field v-model="oldPwd"  type="password" required class="input" clearable label="旧密码" maxlength="18" placeholder="请填写旧密码"/>
               <van-field v-model="newPwd" type="password" required class="input" clearable label="新密码" maxlength="18" placeholder="请填写新密码"/>
               <van-field v-model="reNewPwd" type="password" required class="input" clearable label="确认新密码" maxlength="18" placeholder="请填写确认新密码"/>
          </div>
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
                let params = {
                    oldPassword: this.oldPwd,
                    newPassword: this.newPwd
                }
                this.$store.dispatch('user/updatePwd', params).then(rsp => {
                    if(rsp.code === 200) {
                        Toast.success('密码修改成功');
                        this.$router.push('/setting')
                    }else{
                        Toast.fail('密码修改失败')
                    }
                })
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.content{
    .changebox{
       margin-top: 20px;
    .input{
        font-size: 16px;
        padding: 15px;
        width: 90%;
        margin-left: 5%;
    }
 }
     .changePwd{
       margin-top: 20px; 
       width: 80%;
       margin-left: 10%;
    }
}
   
</style>