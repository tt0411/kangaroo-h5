<template>
  <base-layout>
        <div slot="top" class="topMenu">
          <div class="leftNum">{{typeList[active]}}({{total}})</div>
               <div class="dropdown">
                <van-dropdown-menu active-color="#666666"> 
                  <van-dropdown-item v-model="active" :options="contentTypelist" title-class="dropTitle" @change="changeContentType"/>
                </van-dropdown-menu>
            </div>
      </div>
      <div slot="content">
        <ContentList :contentItem="contentList" :playerOptions="playerOptions"/>
      </div>
  </base-layout>
</template>

<script>
import Empty from '../../components/empty'
import ContentList from './contentList.vue'
export default {
    components: { Empty, ContentList },
    data() {
        return {
            active: 9,
            total: 0,
            typeList: { 
                9: '全部',
                0: '待审核',
                1: '审核通过',
                2: '审核不通过',
                3: '不公开'
            },
            contentTypelist: [
                {text: '全部', value: 9},
                {text: '待审核', value: 0},
                {text: '审核通过', value: 1},
                {text: '审核不通过', value: 2},
                {text: '不公开', value: 3},
            ],
            contentList: [],
            playerOptions: [],
        }
    },
    mounted() {
        this.$store.dispatch('content/getcontentByUid', this.active).then(rsp => {
            if(rsp.code === 200) {
                this.contentList = rsp.list;
                this.total = rsp.count;
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
    },
   methods: {
       changeContentType(value) {
           this.$store.dispatch('content/getcontentByUid', value).then(rsp => {
               if(rsp.code === 200) {
                   this.contentList = rsp.list;
                   this.total = rsp.count;
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
       }
   }
}
</script>

<style lang="scss" scoped>
 .van-dropdown-menu{
      height:40px;
    }
    
    .topMenu{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: #ffffff;
    }
    
    .leftNum{
     margin-left:20px;
     line-height: 40px;
     font-size: 15px;
   
    }
    .van-ellipsis{
      color: #666666 !important;
    }
    .dropdown{
      margin-right: 20px;
    }
    .dropTitle{
      color:#666666;
    }
</style>