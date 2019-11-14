<template>
      <div class="content">
       <van-nav-bar title="设置"  left-arrow   @click-left="handleBack" :border="false"></van-nav-bar>
        <div class="container">
           <van-cell title="个人信息" title-style="font-size: 16px;" is-link to="/info"/>
          <van-cell title="修改密码" title-style="font-size: 16px;" is-link to="/changePwd" />
          <div class="zhanwei"></div>
          <van-cell title="关于袋鼠空间" title-style="font-size: 16px;" is-link to="/about" />
          <div class="zhanwei"></div>
          <van-cell title="退出" title-style="text-align: center;font-size: 16px;" @click="logout"/>
        </div>
      </div>
</template>

<script>
import {Toast} from 'vant'

export default {
  methods: { 
      logout() {
         this.$store.dispatch('user/logout').then(rsp => {
           if(rsp.code === 200){
              localStorage.removeItem('token')
              this.$store.commit('user/changeInfo',{})
              this.$router.push('/user')
            
           }
         })
      },
      handleBack() {
        this.$router.push('/user')
      }
    }
}
</script>

<style lang="scss" scoped>
// 重置van-bar
.van-nav-bar {
  background: #12C3DF;
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
  font-size: 16px;
  .zhanwei{
    width: 100%;
    height:10px;
  }
}
</style>