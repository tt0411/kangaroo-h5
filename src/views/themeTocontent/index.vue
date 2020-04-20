<template>
  <common-layout>
      <div slot="top">
          <div class="card">
                 <div class="item"> 
                    <van-row gutter="5">
                      <van-col span="16">
                       <div class="top">
                           <div class="name">{{name}}</div>
                       </div>
                       <div class="bottom">
                           <div class="user">
                               <div class="avatar">
                                   <van-image width="35" height="35" :round="true" fit="cover" :src="imgUrl" />
                               </div>
                               <div class="userName">{{nickName}}</div>
                           </div>
                           <div class="time">创建于: {{time}}</div>
                       </div> 
                       </van-col>
                        <van-col span="6">
                            <div class="contentCount">
                                <div class="content">内容量</div>
                                <div class="count">{{count}}</div>
                            </div>
                        </van-col>
                         <van-col span="2">
                            <div class="edit" v-if="isEdit" @click="toEdit">
                                <van-icon name="edit" color="#fff" size="20px" />
                            </div>
                        </van-col>
                       </van-row>
                 </div>
          </div>  
            <van-dialog v-model="showBox" title="修改主题" show-cancel-button  :beforeClose="beforeClose" confirm-button-color="#6190e8">
                <div class="theme">
                    <van-field v-model="themeName"  label="主题名称"  maxlength="10" class="input" clearable required :error-message="nameError"/>
                </div>
            </van-dialog>
      </div>
      <div slot="content">
          <ContentItem :more="false" :contentItem="contentList" :isDel="isEdit" :playerOptions="playerOptions" @refreshContentList="refreshContentList"/>
      </div>
     
  </common-layout>
</template>

<script>
import ContentItem from '../components/contentItem'
import {Toast} from 'vant'
export default {
    components: { ContentItem },
    data() {
        return {
            id: null,
            name: '',
            imgUrl: '', 
            time: '',
            nickName: '',
            nameError: '',
            showBox: false,
            themeName: '',
            isEdit: false,
            contentList: [],
            count: 0,
            playerOptions: []
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.name = this.$route.query.name;
        if(this.$route.query.isEdit) {
            this.isEdit = true;
            this.$store.dispatch('content/getMycontentByTid', this.id).then(rsp => {
                if(rsp.code === 200) {
                    this.contentList = rsp.list;
                    this.count = rsp.count;
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
        }else {
             this.$store.dispatch('content/getOpencontentByTid', this.id).then(rsp => {
                if(rsp.code === 200) {
                    this.contentList = rsp.list;
                    this.count = rsp.count;
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
        document.title = '主题内容页'
    },
    mounted() {
        if(this.id) {
            this.$store.dispatch('theme/getThemeById', this.id).then(rsp => {
                if(rsp.code === 200) {
                    this.themeName = rsp.data.name
                    this.imgUrl = rsp.data.imgUrl
                    this.nickName = rsp.data.nickName
                    this.time = rsp.data.create_time
                }
            })
        }
    },
    methods: {
        toEdit() {
            this.showBox = true;
        },
        beforeClose(action, done) {
        if(action === 'confirm') {
        if(!this.themeName) {
            this.nameError = '主题名称不能为空'
            done(false)
        }else{
            let params = {
                name: this.themeName,
                id: this.id
            }
            this.$store.dispatch('theme/updateTheme', params).then(rsp => {
            if(rsp.code === 200) {
                Toast.success(rsp.msg);
                this.name = this.themeName;
                setTimeout(done)
            }
          })
        }    
        } else if(action === 'cancel') {
            done()
        }
      },
      refreshContentList() {
           this.$store.dispatch('content/getMycontentByTid', this.id).then(rsp => {
                if(rsp.code === 200) {
                    this.contentList = rsp.list;
                    this.count = rsp.count;
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
    },
    watch: {
     themeName(newVal, oldVal) {
      if(newVal){
        this.nameError = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped> 
    .card {
      .item{
         background-image: linear-gradient( 135deg, #ABDCFF 10%, #6190e8 100%);
       // background-color: #6190e8;
        display: flex;
        flex-direction: column;
        padding: 5px 10px;
        box-shadow: 0 1px 1px 1px;
        .top{
            margin-bottom: 10px;
            .name{
                font-size: 20px;
                color: #ffffff;
            }
        }
        .bottom{
            display: flex;
            flex-direction: column;
            .user{
                color: #fff;
                display: flex;
                flex-direction: row;
                align-items: center;
                .userName{
                    margin-left: 10px;
                    font-size: 16px;
                }
            }
            .time{
                margin-top: 5px;
                color: #fff;
                font-size: 12px;
            }
        }
        .contentCount{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .content{
                margin-top: 20px;
                color: #fff;
                font-size: 18px;
            }
            .count{
                margin-top: 10px;
                color: #fff;
                font-size: 24px;
            }
        }
    }
}

</style>