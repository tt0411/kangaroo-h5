<template>
     <div class="container"> 
        <div class="back" @click="back">
          <van-icon name="arrow-left" color="#ffffff" size="22px"/>
      </div>
      <div class="bg-user">
        <div class="avatar">
           <van-image width="60" height="60" :round="true" fit="cover" :src="imgUrl[0]" @click="isPreview = true" /> 
        <div class="sex">
          <img :src="sexImg[0]" v-if="sex == 1"/>
          <img :src="sexImg[1]" v-else/>
        </div>
        </div>
       
        <div class="userName">{{nickName}}</div>
        <!-- <div class="signature">个性签名：{{signature}}</div> -->
      </div>
      <van-image-preview v-model="isPreview" :images="imgUrl" />
      <div class="box">
          <div class="myContent" @click="seeTaContent">
            <div class="contents">Ta的内容</div>
            <div class="content-count">
              <van-tag color="#ffe1e1" text-color="#ad0000" size="large">{{contentAllCount}}</van-tag>
            </div>
          </div>
          <div class="myTheme">
            <div class="themes" @click="seeTaTheme">Ta的主题</div>
            <div class="theme-count">
               <van-tag color="#ffe1e1" text-color="#ad0000" size="large">{{themeAllCount}}</van-tag>
            </div>
          </div>
           <div class="getMark">
            <div class="marks">获得点赞</div>
            <div class="mark-count">
               <van-tag color="#ffe1e1" text-color="#ad0000" size="large">{{markedCount}}</van-tag>
            </div>
          </div>
           <div class="getSave">
            <div class="saves">获得收藏</div>
            <div class="save-count">
               <van-tag color="#ffe1e1" text-color="#ad0000" size="large">{{savedCount}}</van-tag>
            </div>
          </div>
      </div>  
      <div>
        <van-tabs v-model="active" animated color="#6190e8" swipeable>
         <van-tab >
             <div slot="title">喜欢 {{markCount}}</div>
            <ContentItem :more="false" :contentItem="contentList" :playerOptions="playerOptions"/>
          </van-tab>
          <van-tab>
              <div slot="title">收藏 {{saveCount}}</div>
            <ContentItem :more="false" :contentItem="contentLists" :playerOptions="splayerOptions"/>
          </van-tab>
      </van-tabs>
      </div>  
     </div>
</template>

<script>
import ContentItem from '../components/contentItem'
import Empty from '../../components/empty.vue'
import { getMyMarkContent, getMySaveContent, getcontentCountByUid, getSaveByUid, getMarkByUid } from '../../api/content'
import { fetchUserTheme } from '../../api/theme'
import { getInfo } from '../../api/user'
import {Toast} from 'vant'

export default {
  components: { ContentItem, Empty },
    data(){
        return {
          active: 0,
          imgUrl: [],
          nickName: '',
          signature: '2019继续加油！',
          isPreview: false,
          uid: null,
          contentList: [],
          contentLists: [],
          playerOptions: [],
          splayerOptions: [],
          markCount: 0,
          saveCount: 0,
          contentAllCount: 0,
          themeAllCount: 0,
          markedCount: 0,
          savedCount: 0,
          sex: 0,
          sexImg: [
            'https://i.loli.net/2019/12/16/Ti5udnjJwIgefxt.png',
            'https://i.loli.net/2019/12/16/xYIJdfznZup57aD.png',
          ],
        }
    },
    created() {
      if( this.$route.query.id ) {
        this.uid = this.$route.query.id  
         getInfo(this.uid).then(rsp => {
         if(rsp.code === 200) {
             this.imgUrl[0] = rsp.data.imgUrl;
             this.nickName = rsp.data.nickName;
             this.sex = rsp.data.gender;
         }
       })
      getMyMarkContent(this.uid).then(rsp => {
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

         getMySaveContent(this.uid).then(rsp => {
          if(rsp.code === 200) {
             this.contentLists = rsp.list;
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

        getcontentCountByUid(this.uid).then(rsp => {
          if(rsp.code === 200) {
            this.contentAllCount = rsp.count
          }
        })
        fetchUserTheme(this.uid).then(rsp=> {
          if(rsp.code === 200) {
            this.themeAllCount = rsp.count
          }
        })
        getSaveByUid(this.uid).then(rsp=> {
          if(rsp.code === 200) {
            this.savedCount = rsp.count
          }
        })
        getMarkByUid(this.uid).then(rsp=> {
          if(rsp.code === 200) {
            this.markedCount = rsp.count
          }
        })
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      seeTaContent() {
          Toast('暂时无法查看Ta的内容')
      },
      seeTaTheme() {
        Toast('暂时无法查看Ta的主题')
      }
    }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
.bg-user {
  background-color: #6190e8;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar{
    margin-top: 10px;
    position: relative;
  .sex {
    position: absolute;
    top: -5px;
    right: -5px;
    img {
      width: 28px;
      height: 28px;
    }
   }
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
.back{
  position: absolute;
  left: 10px;
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