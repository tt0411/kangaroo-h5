<template>
  <common-layout>
      <div slot="content">
          <div class="container">
              <div class="top">
              <div class="bg">
                  <img :src="imgUrl"/>
              </div>
              <div class="write">
                  <van-icon name="https://i.loli.net/2019/11/08/MPGuNnFwp936Jai.png" size="30px"  @click="toWrite"/>
              </div>
              <div class="user">
                  <div class="userName" v-if="isLogin">{{nickName}}</div>
                  <div class="userName" v-else>未登录</div>
                  <div class="avatar">
                      <van-image width="50" height="50" :round="true" fit="cover" :src="avatar" v-if="isLogin" ></van-image>
                      <van-image width="50" height="50" :round="true" fit="cover" :src="defaultAvatar" v-else @click="toLogin"></van-image>
                  </div>
              </div>
              </div>
              <div class="content">
                  <div class="contentList">
                      <ContentItem :more="false"/>
                  </div>
              </div>
          </div>

          <van-dialog v-model="show" title="提示" show-cancel-button confirmButtonColor="#12C3DF" confirmButtonText="去登录" @confirm="toLogin">
         <div class="loginDialog">登录后才能写内容哟 ~_~</div>
        </van-dialog>
      </div>
  </common-layout>
</template>

<script>
import {Toast} from 'vant' 
import ContentItem from '../index/contentItem'
import {mapState} from 'vuex'
export default {
    components: { ContentItem },
       data() {
           return {
               imgUrl: 'https://i.loli.net/2019/11/08/wlkQoEpDPJAyj19.jpg',
               avatar: '',
               defaultAvatar: 'https://i.loli.net/2019/11/20/aGvftlCNr7TOLKB.png',
               nickName: '',
               show: false,
               isLogin: false,
           }
       },
       computed: {
           ...mapState(['user'])
       },
       created() {
           if(localStorage.getItem('token')) {
                this.isLogin = true;
           }else{
                this.isLogin = false;
           }
           this.avatar = this.user.userInfo.imgUrl;
           this.nickName = this.user.userInfo.nickName;
       },
       methods: {
           toWrite() {
               if(localStorage.getItem('token')){
                   this.$router.push('/writeContent')
               }else{
                   this.show = true;
               }
           },
           toLogin() {
               this.$router.push('/login')
           }
       }
}
</script>

<style lang="scss" scoped>
.container {
    .top{
       position: relative;
    .bg{
        img{
            width: 100%;
            height: 150px;
        }
    }
    .write{
        position: absolute;
        top: 15px;
        left: 10px;
    }
    .user{
        position: absolute;
        top: 90px;
        right: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .userName{
            margin-right: 10px;
            color: #fff;
        }
    }
   }
 
}
  .loginDialog{
    text-align: center;
    padding: 10px 0;
    color: #776d6d;
}
</style>