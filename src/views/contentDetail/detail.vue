<template>
  <div class="content">
    <div class="content-item">
      <div class="info">
        <div class="avatar">
          <van-image width="45" height="45" :round="true" fit="cover" :src="detailData.imgUrl"  @click="toHomePage"/>
        </div>
        <div class="name-time">
          <div class="name">{{detailData.nickName}}</div>
          <div class="time">发表于: {{detailData.create_time}}</div>
        </div>
      </div>
      <div class="three-content">
        <div class="img-content">
          <div class="text-content" v-if="detailData.context">{{detailData.context}}</div>
          <div class="imageList" v-if="detailData.img">
            <div v-if="detailData.img.length === 1">
              <van-row>
                <van-col span="24">
                  <van-image
                    :src="detailData.img"
                    style="width: 100%;height: 100px;"
                    @click="show = true"
                  ></van-image>
                </van-col>
              </van-row>
              <van-image-preview v-model="show" :images="detailData.img"></van-image-preview>
            </div>
            <div v-if="detailData.img.length === 2">
              <van-row gutter="5">
                <van-col span="12" v-for="(item1, index) in detailData.img" :key="index">
                  <van-image :src="item1" style="width: 100%;height: 100px;" @click="show = true"></van-image>
                </van-col>
              </van-row>
              <van-image-preview v-model="show" :images="detailData.img"></van-image-preview>
            </div>
            <div v-if="detailData.img.length >= 3">
              <van-row gutter="5">
                <van-col span="8" v-for="(item1, index) in detailData.img" :key="index">
                  <van-image :src="item1" style="width: 100%;height: 100px;" @click="show = true"></van-image>
                </van-col>
              </van-row>
              <van-image-preview v-model="show" :images="detailData.img"></van-image-preview>
            </div>
          </div>
        </div>
        <div class="audio-content" v-if="detailData.audio">
          <div class="text-content" v-if="detailData.context">{{detailData.context}}</div>
          <audio :src="detailData.audio" controls="controls"></audio>
        </div>
        <div class="video-content" v-if="detailData.video">
          <div class="text-content" v-if="detailData.context">{{detailData.context}}</div>
          <video-player
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            x5-playsinline="true"
            webkit-playsinline="true"
            x5-video-player-type="h5"
            customEventName="customstatechangedeventname"
          ></video-player>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      show: false,
      playerOptions: {},
      detailData: {},
    }
  },
  computed: {
    ...mapState(['content'])
  },
  mounted() {
     this.$store.dispatch('content/getContentById', this.content.content_id).then(rsp => {
       if(rsp.code === 200) {
         this.detailData = rsp.data
       
         this.playerOptions = {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false,
          muted: false,
          loop: false,
          preload: "auto",
          language: "zh-CN",
          aspectRatio: "16:9",
          fluid: true,
          sources: [
            {
              type: "video/mp4",
              src: this.detailData.video
            }
          ],
          poster:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=673709352,371074027&fm=26&gp=0.jpg", //你的封面地址
          notSupportedMessage: "此视频暂无法播放，请稍后再试"
        }
       }
     })
  },
  methods: {
   toHomePage() {
    // this.$router.push({path: '/homePage', query: { id: this.detailData.uid }})
   },
   
  }
}
</script>
 
<style lang="scss" scoped>
.content {
  // background: #ffffff;
  // height: 100vh;
  .content-item {
    padding: 8px;
    .info {
      display: flex;
      flex-direction: row;
      align-items: center;
      .name-time {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-size: 16px;
          margin-bottom: 5px;
          color: #585656;
        }
        .time {
          color: #a8a7a7;
          font-size: 13px;
        }
      }
    }
    .three-content {
      margin-top: 10px;
      .text-content {
        text-indent: 20px;
        margin-bottom: 10px;
      }
      .img-content {
        margin-bottom: 10px;
      }
      .audio-content {
        width: 100%;
        margin-bottom: 10px;
        audio {
          width: 100%;
        }
      }
      .video-content {
        width: 100%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>