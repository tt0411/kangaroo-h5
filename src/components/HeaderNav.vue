<template>
  <div :class="isShow ? 'show' : 'none' ">
  <van-nav-bar :title="title || '袋鼠空间'"  :left-arrow="isShowLeft"   @click-left="handleBack" :border='border'></van-nav-bar>
</div>
</template>

<script>
export default {
   data() {
    return {
      title:document.title || '袋鼠空间',
      border:false,
    };
  },
  props:{
     outBack: {
       type: Boolean,
       default: false
     },
     isShowLeft: {
      type: Boolean,
      default: true,
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleBack() {
      if(!this.outBack) {
        this.$router.go(-1);
        return
      } 
      this.$emit('click-left')
    }
  }
};
</script>

<style scoped lang='scss'>
.show{
  display: block;
}
.none{
  display: none;
}
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
