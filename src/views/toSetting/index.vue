<template>
  <common-layout>
      <div slot="content">
        <div class="container">
           <van-cell title="个人信息" is-link to="/info"/>
          <van-cell title="修改密码" is-link to="/changePwd" />
          <div class="zhanwei"></div>
          <van-cell title="关于袋鼠空间" is-link />
          <div class="zhanwei"></div>
          <van-cell title="退出" title-style="text-align: center" @click="logout"/>
        </div>
      </div>
  </common-layout>
</template>

<script>
import {Toast} from 'vant'
export default {
  methods: { 
      logout() {
          Toast('退出')
      }
    }
}
</script>

<style lang="scss" scoped>
.container{
  background-color: #f5f5f5;
  height: calc(100vh - 44px);
  .zhanwei{
    width: 100%;
    height:10px;
  }
}
</style>