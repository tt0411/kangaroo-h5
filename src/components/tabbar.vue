<template>
      <van-tabbar v-model="active"  active-color="#12C3DF">
        <van-tabbar-item name='index' icon="home-o" @click="toHome">首页</van-tabbar-item>
        <van-tabbar-item name='theme' icon="points" @click="toTheme">主题</van-tabbar-item>
        <van-tabbar-item name='message' icon="envelop-o" @click="toMessage">消息</van-tabbar-item>
        <van-tabbar-item name='user' icon="manager-o" @click="toUser">个人中心</van-tabbar-item>
      </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: '',
    };
  },
  mounted(){
     this.active = this.$route.name || '';
  },
  updated(){
      this.active = this.$route.name || '';
  },
  methods: {
    toUser(){
      if(this.$route.name !=='user'){
        if(localStorage.getItem('token')){
          this.$router.push({
            path: "/user"
          });
        }else{
          this.$router.push({
            path: '/login'
          })
        }
          
      }
    },
    toHome(){
      if(this.$route.name !=='index'){
         this.$router.push({
            path: "/"
          });
      }
    },
     toTheme(){
      if(this.$route.name !=='theme'){
          this.$router.push({
            path: "/theme"
          });
      }
    },
    toMessage(){
       if(this.$route.name !=='message'){
         this.$router.push({
            path: "/message"
          });
      }
    },
  }
};
</script>

<style lang="scss" scoped>

</style>