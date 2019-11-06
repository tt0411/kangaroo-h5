<template>
      <div id="container">
          <div class="header">
             <slot name="top"></slot>
          </div>
          <div class="content">
              <slot name="content"></slot>
          </div>
          <div class="footer">
              <tabbar />
          </div>
      </div>

</template>

<script>
import Tabbar from './tabbar.vue';
export default {
  components: {Tabbar},
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
};
</script>

<style lang="scss" scoped>
    #container{
       background: #ffffff;
        height: 100%;
        font-size: 0.14rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .content {
            flex: 1;
            overflow: auto;
        }
        .footer{
          margin-top: 94px;
        }
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