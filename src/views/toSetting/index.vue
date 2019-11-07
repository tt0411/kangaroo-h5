<template>
  <common-layout>
      <div slot="content">
        <div class="container">
           <van-cell title="个人信息" title-style="font-size: 16px;" is-link to="/info"/>
          <van-cell title="修改密码" title-style="font-size: 16px;" is-link to="/changePwd" />
          <div class="zhanwei"></div>
          <van-cell title="关于袋鼠空间" title-style="font-size: 16px;" is-link to="/about" />
          <div class="zhanwei"></div>
          <van-cell title="退出" title-style="text-align: center;font-size: 16px;" @click="logout"/>
        </div>
      </div>
  </common-layout>
</template>

<script>
import {Toast} from 'vant'
export default {
  methods: { 
      logout() {
         this.$router.push('/login')
      }
    }
}
</script>

<style lang="scss" scoped>
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