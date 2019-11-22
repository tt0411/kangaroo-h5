<template>
  <user-layout>
   <div slot="content">
     <div class="container"> 
        <div class="setting" @click="setting" >
          <van-icon name="setting-o" color="#ffffff" size="22px"/>
      </div>
      <div class="bg-user">
        <div class="avatar">
           <van-image width="60" height="60" :round="true" fit="cover" v-if="imgUrl[0]" :src="imgUrl[0]" @click="isPreview = true" />
        </div>
        <div class="userName">{{nickName}}</div>
        <!-- <div class="signature">个性签名：{{signature}}</div> -->
      </div>
      <van-image-preview v-model="isPreview" :images="imgUrl" />
      <div class="box">
          <div class="myContent" @click="toMyContent">
            <div class="contents">我的内容</div>
            <div class="content-count">
              <van-tag color="#ffe1e1" text-color="#ad0000" size="large">21</van-tag>
            </div>
          </div>
          <div class="myTheme" @click="toTheme">
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
          <van-tab >
             <div slot="title">喜欢 {{markCount}}</div>
            <ContentItem :like="true" :more="false" :contentItem="contentList" :playerOptions="playerOptions"/>
          </van-tab>
          <van-tab>
              <div slot="title">收藏 {{markCount}}</div>
            <ContentItem :like="true" :more="false" :contentItem="contentLists" :playerOptions="splayerOptions"/>
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
          nickName: '',
          signature: '',
          isPreview: false,
          contentList: [],
          contentLists: [],
          playerOptions: [],
          splayerOptions: [],
          markCount: 0,
          saveCount: 0,
        }
    },
     computed: {
       ...mapState(["user"])
    },
    created() { 
      if(localStorage.getItem('token')){
         this.$store.dispatch("user/getInfo").then(rsp => {
            if(rsp.code === 200) {
                this.nickName = this.user.userInfo.nickName;
                this.imgUrl[0] = this.user.userInfo.imgUrl;
            }
        }) 
        
        this.$store.dispatch('content/getMyMarkContent').then(rsp => {
          if(rsp.code === 200) {
             this.contentList = rsp.list;
             this.markCount = rsp.count;
              this.contentList.forEach((item, index) => {
                    this.playerOptions.push({
                        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                        autoplay: false, //如果true,浏览器准备好时开始回放。
                        muted: false, // 默认情况下将会消除任何音频。
                        loop: false, // 导致视频一结束就重新开始。
                        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                        language: "zh-CN",
                        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                        sources: [
                        {
                            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                            src: item.video //url地址
                        }
                        ],
                        poster:
                        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=673709352,371074027&fm=26&gp=0.jpg", //你的封面地址
                        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    });
              });
          }
        })

         this.$store.dispatch('content/getMySaveContent').then(rsp => {
          if(rsp.code === 200) {
             this.contentList = rsp.list;
             this.saveCount = rsp.count;
              this.contentLists.forEach((item, index) => {
                    this.splayerOptions.push({
                        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                        autoplay: false, //如果true,浏览器准备好时开始回放。
                        muted: false, // 默认情况下将会消除任何音频。
                        loop: false, // 导致视频一结束就重新开始。
                        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                        language: "zh-CN",
                        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                        sources: [
                        {
                            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                            src: item.video //url地址
                        }
                        ],
                        poster:
                        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=673709352,371074027&fm=26&gp=0.jpg", //你的封面地址
                        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    });
              });
          }
        })
      } 
    },
    methods: {
      setting() {
        this.$router.push('/setting')
      },
      toLogin() {
        this.$router.push('/login')
      },
      toMyContent() {
        this.$router.push('/mycontent')
      },
      toTheme() {
        this.$router.push({path: '/theme', query: { active: 1 }})
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