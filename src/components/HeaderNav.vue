<template>
    <van-nav-bar :title="title" :left-arrow="isBack"  @click-left="onClickLeft"></van-nav-bar>
</template>
<script>
export default {
   props:['isBack'],
   data(){
       return{
           title: document.title || '测试页面',
       }
   },
   methods: {
       onClickLeft(){
           this.$router.go(-1)
       }
   }
}
</script>

<style scoped lang='scss'>
// 重置van-bar
.van-nav-bar {
  background: #12C3DF;
  .van-nav-bar__title {
    color: #ffffff;
  }
  .van-icon {
    color: #ffffff;
  }
  .van-nav-bar__text {
    color: #ffffff;
  }
}
</style>