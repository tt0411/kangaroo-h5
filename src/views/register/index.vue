<template>
  <common-layout>
      <div slot="content">
          <van-cell-group style="height: 62px">
           <van-cell>
            <template slot="title">
               <van-image round width="46px" height="46px" :src="imgUrl[0]" @click="previewImg"></van-image>
            </template>
            <van-uploader :after-read="uploadImg" accept="image/*" capture="camera">
                <!-- <van-button icon="photo" color="#12C3DF" size="small" >上传图片</van-button> -->
                <van-icon name="arrow" size="20px" style="line-height: 46px"/>
            </van-uploader>
            </van-cell> 
            <van-image-preview v-model="show" :images="imgUrl"></van-image-preview>
           </van-cell-group>
           <div style="margin:0 10px;">
            <van-field required v-model="nickName" maxlength="10" label="用户名" placeholder="请填写用户名" />
                <van-field required v-model="phone" maxlength="11" type="tel" label="手机号" placeholder="请填写手机号" />
             <van-field required v-model="age" type="number" maxlength="2" label="年龄"  placeholder="请填写年龄" />
            <van-cell required>
            <template slot="title">
                <div class="gender">
                <span class="custom-title">性别</span>
                <van-radio-group @change="pickgender" v-model="gender" style="display:flex;flex-direction: row;margin-left: 62px;">
                 <van-radio checked-color="#12C3DF" name="1">男</van-radio> &nbsp;&nbsp;&nbsp;&nbsp;
                 <van-radio checked-color="#12C3DF" name="2">女</van-radio>
                </van-radio-group>
                </div> 
            </template>
          </van-cell>
         <van-field v-model="password" type="password" maxlength="18" label="密码" placeholder="请填写密码" required/>
             <van-field v-model="repassword" type="password" maxlength="18" label="确认密码" placeholder="请填写确认密码" required/> 
         <div class="tips">
             <div>
             <van-icon name="warning" color="#12C3DF"/>
             </div> 
             <div style="margin-top: -2px;">
             <span class="tips-content">手机号作为登录的唯一账号，请妥善保管</span>
             </div>
         </div>
         <div class="register">
              <van-button color="#12C3DF" round  size="large" @click="register">注册</van-button>
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
            show: false,
            imgUrl: ['https://i.loli.net/2019/11/04/PJSrydQFn3tN42p.png'],
            nickName: '',
            phone: '',
            age: '',
            gender: '1',
            password: '',
            repassword: '',
        }
    },
    methods: {
        previewImg() {
           this.show = true;
        },
        uploadImg(file) {
            this.imgUrl = []
            this.imgUrl[0] = file.content
        },
        pickgender(name){
           this.gender = name
        },
        register(){
            if(!this.nickName){
               Toast('请填写用户名') 
            }else if(!this.phone || !(/^1[3456789]\d{9}$/.test(this.phone))){
                Toast('手机号不合法')
            }else if(!this.age || this.age < 0){
                Toast('年龄不合法')
            }else if(!this.password){
                Toast('请填写密码')
            }else if (!this.repassword) {
                Toast('请填写确认密码')
            }else if(this.password !== this.repassword){
                Toast('两次密码不一致')
            }else{
                console.log('去注册')
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
.gender{
    display: flex;flex-direction: row;
}
.tips{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px 0;
    .tips-content{
        color: #9c9a9a;
        margin-left: 5px;
        font-size: 14px;
    }
}
.register{
    margin-top: 20px;
}
</style>