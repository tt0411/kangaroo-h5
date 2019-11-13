<template>
  <common-layout>
      <div slot="content">
          <div class="content">
               <van-field
                v-model="phone"
                type="number"
                required
                clearable
                label="手机号"
                maxlength="11"
                placeholder="请填写手机号"
            />
     
             <div class="tips">
             <div>
             <van-icon name="warning" color="#12C3DF"/>
             </div> 
             <div style="margin-top: -4px;">
             <span class="tips-content">为保证账号安全,重置密码进入app后尽快修改密码</span>
             </div>
         </div>
          <div class="resetPwd">
            <van-button color="#12C3DF" round  size="large"  @click="resetpwd" :disabled="isReset">重置密码</van-button>
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
            phone: '',
            isReset: true
        }
    },
    methods: {
        resetpwd(){
            if(!(/^1[3456789]\d{9}$/.test(this.phone))){
                Toast('手机号不合法')
            }else{
                let params = {
                    phone: this.phone
                }
                this.$store.dispatch(`user/resetPwd`, params).then(rsp => {
                    if(rsp.code === 200){
                        Toast(rsp.msg)
                        this.$router.push('/login')
                    }
                })
            }
        }
    },
    watch: {
        phone(newVal, oldVal) {
            if(newVal.length === 11){
                this.isReset = false
            }else{
                this.isReset = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    margin-top: 10px;
     .resetPwd{
       margin-top: 10px; 
       width: 80%;
       margin-left: 10%;
    }
  .tips{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 80%;
    margin: 20px 10%;
    .tips-content{
        color: #9c9a9a;
        margin-left: 5px;
        text-indent: 20px;
    }
 }
}
   
</style>