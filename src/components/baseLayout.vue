<template>
      <div id="container">
          <div class="header">
             <header-nav :isShowLeft="false"/>
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
import HeaderNav from "./headerNav.vue"; 
import Tabbar from './tabbar.vue';
export default {
  components: {HeaderNav, Tabbar},
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
          margin-top: 50px;
        }
    }
    // 重置van-bar
.van-nav-bar {
  background: #6190e8;
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