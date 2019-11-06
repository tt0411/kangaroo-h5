<template>
  <div class="container">
  <van-nav-bar title="" left-text="更改名字"  right-text="更改" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
     <van-button slot="right" type="primary" size="small" v-if="!isDisabled">更改</van-button>
     <van-button slot="right" type="default"  size="small" v-else :disabled="true">更改</van-button>
  </van-nav-bar>
  <van-field v-model="value" maxlength="10" class="input"/>
  <div class="tips">好名字更容易让别人记住你</div>
  </div>
</template>

<script>
import {Toast} from 'vant'
export default {
    data() {
        return{
            isDisabled: true,
            value: '李喋喋',
            nickName: '李喋喋',
        }
    },
    methods: {
        onClickLeft() {
          this.$router.go(-1)
        },
        onClickRight() {
          if(!this.isDisabled){
            Toast('更改')
          }
            
        }
    },
    watch: {
        value(newVal, oldVal) {
            if(newVal !== this.nickName) {
                this.isDisabled = false
            }else{
                this.isDisabled = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
 .input{
        caret-color: #12C3DF;
        margin-top: 20px;
        font-size: 16px;
        border-bottom: 1px solid #12C3DF;
        width: 96%;
        margin-left: 2%;
    }
    .tips{
        margin: 10px 20px;
        color: #b3b1b1;
        font-size: 13px;
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