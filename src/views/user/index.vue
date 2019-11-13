<template>
  <user-layout>
   <div slot="content">
     <div class="container"> 
        <div class="setting" @click="setting" v-if="isLogin">
          <van-icon name="setting-o" color="#ffffff" size="22px"/>
      </div>
      <div class="bg-user">
        <div class="avatar">
           <van-image width="60" height="60" :round="true" fit="cover" v-if="imgUrl[0]" :src="imgUrl[0]" @click="isPreview = true" />
           <van-image width="60" height="60" :round="true" fit="cover" v-else :src="defaultImg"/>
        </div>
        <div class="userName" v-if="nickName">{{nickName}}</div>
        <div class="unuserName" v-else @click="toLogin">登录</div>
        <!-- <div class="signature">个性签名：{{signature}}</div> -->
      </div>
      <van-image-preview v-model="isPreview" :images="imgUrl" />
      <div class="box">
          <div class="myContent">
            <div class="contents">我的内容</div>
            <div class="content-count">
              <van-tag color="#ffe1e1" text-color="#ad0000" size="large">21</van-tag>
            </div>
          </div>
          <div class="myTheme">
            <div class="themes">我的主题</div>
            <div class="theme-count">
               <van-tag color="#ffe1e1" text-color="#ad0000" size="large">3</van-tag>
            </div>
          </div>
           <div class="getMark">
            <div class="marks">获得点赞</div>
            <div class="mark-count">
               <van-tag color="#ffe1e1" text-color="#ad0000" size="large">321</van-tag>
            </div>
          </div>
           <div class="getSave">
            <div class="saves">获得收藏</div>
            <div class="save-count">
               <van-tag color="#ffe1e1" text-color="#ad0000" size="large">76</van-tag>
            </div>
          </div>
      </div>  
      <div>
        <van-tabs v-model="active" animated color="#12C3DF">
          <van-tab title="喜欢">
            <ContentItem :like="true" :more="false"/>
          </van-tab>
          <van-tab title="收藏">
              <div class="nothing">
                <Empty :type="2"/>
              </div>
          </van-tab>
      </van-tabs>
      </div>  
     </div>
   </div>
  </user-layout>
</template>

<script>
import ContentItem from '../index/contentItem'
import Empty from '../../components/empty.vue'
import {mapState} from 'vuex'
export default {
  components: { ContentItem, Empty },
    data(){
        return {
          active: 0,
          imgUrl: [],
          defaultImg: "https://i.loli.net/2019/11/04/PJSrydQFn3tN42p.png",
          nickName: '',
          signature: '',
          isPreview: false,
          isLogin: true,
        }
    },
     computed: {
       ...mapState(["user"])
    },
    mounted() {     
        this.nickName = this.user.userInfo.nickName;
        this.imgUrl[0] = this.user.userInfo.imgUrl;
      if(this.nickName){
          this.isLogin = true;
       }else{
         this.isLogin = false
       }      
    },
    methods: {
      setting() {
        this.$router.push('/setting')
      },
      toLogin() {
        this.$router.push('/login')
      }
    }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
.bg-user {
 // background-image: linear-gradient(to right, rgb(109, 211, 226) ,rgb(6, 192, 221));
  background-color: #12C3DF;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar{
    margin-top: 10px;
  }
  .userName{
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    margin: 5px;
  }
  .unuserName{
    font-size: 16px;
    font-weight: bold;
    margin: 5px; 
    color: #8b8787;
  }
  .signature{
    color: #ffffff;
    font-size: 13px;
  }
}
.setting{
  position: absolute;
  right: 30px;
  top: 10px;
}
.box{
  background-color: #ffffff;
  height: 80px;
  margin-top: -40px;
  color: #888484;
  width: 80%;
  margin-left: 10%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .myContent{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    .contents{
      margin-bottom: 5px;
    }
  }
  .myTheme{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    .themes{
      margin-bottom: 5px;
    }
  }
  .getMark{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    .marks{
      margin-bottom: 5px;
    }
  }
  .getSave{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .saves{
      margin-bottom: 5px;
    }
  }
}
.nothing{
  margin-top: 5%;
}
}
</style>