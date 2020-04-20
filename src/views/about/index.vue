<template>
  <common-layout>
      <div slot="content">
          <div class="container">
              <div class="logo">
                   <van-image width="80" height="80" fit="cover" :src="logo" />
              </div>
              <div class="name">袋鼠空间</div>
              <div class="text">
                  亲爱的用户，欢迎您们使用袋鼠空间APP，袋鼠空间一直秉承着"记录美好生活，留存美好记忆"的
                  理念为用户打造一个随时随地记录分享自己生活点滴的平台。感谢您们一直以来的支持，我们会努力打
                  造更好的产品和更好的服务给大家！
              </div>
              
          </div>
      </div>
  </common-layout>
</template>

<script>
export default {
    data() {
        return {
            logo: require('../../assets/logo.png'),
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .name{
        margin: 20px 0;
        font-weight: bold;
        font-size:20px;
    }
    .text{
        width: 80%;
        text-indent: 30px;
        line-height: 28px;
        letter-spacing: 1px;
    }
}
</style>