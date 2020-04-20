<template>
      <div class="content">
            <van-nav-bar title="个人信息"  left-arrow   @click-left="handleBack" :border="false"></van-nav-bar>
          <div class="container">
          <van-cell title="头像"  style="line-height: 55px;height: 67px;font-size: 16px;">
           <van-uploader  :after-read="uploadImg" accept="image/*" capture="camera"> 
            <template slot="default">
               <van-image width="46px" height="46px"  round :src="imgUrl[0]" @click="isPreview = true" />
            </template>
            </van-uploader>
            <van-icon slot="right-icon" name="arrow" size="16px" color="#969799" style="line-height: 50px;margin-left: 10px" @click="isPreview = true" />
          
          </van-cell>
          <van-image-preview v-model="isPreview" :images="imgUrl" />
          <van-cell title="昵称" title-style="font-size: 16px;" is-link :value="nickName" to="/changeNickname"/>
          <van-cell title="性别" title-style="font-size: 16px;" is-link :value="genderObj[gender]" @click="genderModal" />
          <van-cell title="账号" title-style="font-size: 16px;" :value="phone" />

        </div>
        <van-dialog v-model="show" title="选择性别" show-cancel-button @confirm="pickedGender" confirm-button-color="#6190e8">
            <van-radio-group v-model="radio" style="padding: 20px;">
                <van-radio name="1" checked-color="#6190e8" style="margin-bottom: 20px;">男</van-radio>
                <van-radio name="2" checked-color="#6190e8">女</van-radio>
            </van-radio-group>
       </van-dialog>
      </div>
</template>

<script>
import { Toast } from 'vant'
import { uploadImg } from '../../utils/utils'
import { mapState } from 'vuex'

export default {
    data() {
        return{
           imgUrl: [],
           imgFile: [],
           nickName: '',
           gender: '',
           genderObj:{
               1: '男',
               2: '女'
           },
           phone: '',
           show: false,
           radio: null, 
           isPreview: false
        }
    },
    computed:{
        ...mapState(["user"])
    },
    created(){
       this.imgUrl[0] = this.user.userInfo.imgUrl;
       this.radio = `${this.user.userInfo.gender}`; // 转成字符串
       this.gender = `${this.user.userInfo.gender}`;
       this.nickName = this.user.userInfo.nickName;
       this.phone = this.user.userInfo.phone;
    },
    methods: {
        handleBack() {
            this.$router.push('/setting')
        },
        genderModal() {
            this.show = true;
        },
        pickedGender() {
            this.gender = this.radio;
            let params = {
                gender: this.gender
            }
            this.$store.dispatch('user/updateGender', params).then( rsp => {
                if(rsp.code === 200){
                    console.log('性别修改成功')
                }else{
                    Toast.fail('性别修改失败')
                }
            })
        },
       uploadImg(file) {
            this.imgUrl = []
            this.imgUrl[0] = file.content
            let files = file.file
             uploadImg(files).then(res => {
                let params = {
                    imgUrl: res.data
                }
                if(res.code === 200){
                    this.$store.dispatch('user/updateAvater', params).then(rsp => {
                        if(rsp.code === 200) {
                            console.log('头像更改成功')
                        }else{
                            Toast.fail('头像更改失败')
                        }
                    })
                }
            }) 
        },
    }
}
</script>

<style lang="scss" scoped>
// 重置van-bar
.van-nav-bar {
  background: #6190e8;
  .van-nav-bar__title {
    color: #ffffff;
  }
  .van-icon {
    color: #ffffff;
    font-size: 20px;
  }
  .van-nav-bar__text {
    color: #ffffff;
  }
}
.container{
  background-color: #f5f5f5;
  height: calc(100vh - 50px);
    .zhanwei{
    width: 100%;
    height:10px;
  }
}
</style>