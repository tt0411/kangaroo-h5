<template>
  <common-layout>
      <div slot="content">
          <div class="content">
            <div class="changebox">
               <van-field v-model="newPwd" type="password" required class="input" clearable label="新密码" maxlength="18" placeholder="请填写新密码"/>
               <van-field v-model="reNewPwd" type="password" required class="input" clearable label="确认新密码" maxlength="18" placeholder="请填写确认新密码"/>
          </div>
          <div class="changePwd">
            <van-button color="#6190e8" round  size="large"  @click="changePwd">修改密码</van-button>
          </div>
      </div> 
    </div>
  </common-layout>
</template>

<script>
import {Toast} from 'vant'
import { resetPwd } from '../../api/user'
export default {
    data() {
        return {
            newPwd: '',
            reNewPwd: '',
            phone: '',
        }
    },
    created() {
      this.phone = this.$route.query.phone;
    },
    methods: {
        changePwd(){
            if(!this.newPwd) {
                Toast('请填写新密码')
            }else if(!this.reNewPwd) {
                Toast('请填写确认新密码')
            }else if(this.newPwd !== this.reNewPwd) {
                Toast('两次密码输入不一致')
            }else{
             let params = {
                newPassword: this.newPwd,
                phone: this.phone
            }
            resetPwd(params).then(rsp => {
                if(rsp.code === 200) {
                    Toast.success('密码修改成功');
                    this.$router.push('/login')
                }else {
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
    //    margin-top: 20px;
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