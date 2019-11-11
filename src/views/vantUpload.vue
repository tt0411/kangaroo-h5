<template>
 <div class="container">
    <header-nav :isShowLeft="false" />
    <div class="content">
    <div class="imgList" v-if="type === 1">
    <div>
        <van-row gutter="5">
            <van-col class="imgItem" span="8" v-for="(item, index) in imgFile" :key="index">
                  <van-image :src="item.content" cover class="img" @click="show = true"></van-image> 
                  <van-icon name="clear" size="18" color="#94979b"  @click="delBtn(index)" class="delete"/>
            </van-col>  
        </van-row> 
        <van-image-preview v-model="show" :images="showImg" />
    </div>
    <div>
    <van-uploader multiple :max-count="9" v-show="imgFile.length < 9" capture="camera" accept="image/*" :after-read="afterRead"></van-uploader>
    </div>
   </div> 
   <div class="video" v-if="type === 2">
        <van-row>
            <van-col class="videoItem" span="24" v-if="playerOptions.sources[0].src">
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
                  <van-icon name="clear" size="30" color="#94979b"  @click="delVideo" class="delete"/>
            </van-col>  
        </van-row> 
        <div>
             <van-uploader  v-show="!this.playerOptions.sources[0].src" capture="camera" accept="video/*" :after-read="afterVideoRead"></van-uploader>
        </div>
   </div>
   <div class="audio" v-if="type === 3">
        <van-row>
            <van-col class="audioItem" span="24" v-if="audioSrc">
                   <audio :src="audioSrc" controls="controls"></audio>  
                  <van-icon name="clear" size="20" color="#94979b"  @click="delAudio" class="delete"/>
            </van-col>  
        </van-row> 
        <div>
             <van-uploader  v-show="!audioSrc" capture="camera" accept="audio/*" :after-read="afterAudioRead"></van-uploader>
        </div>
   </div>
   <div style="text-align: center">
    <van-button type="info" @click="submitData">提交</van-button>
   </div>
   </div>
</div>

</template>

<script>
import axios from "axios"
import {Toast} from 'vant'
export default {
      data(){
          return {
            type: 3,
            imgFile: [],
            backImgList: [],
            imageUrl: [],
            show: false,
            showImg: [],
            videoUrl: '',
            sendVideo: [],
            audioSrc: '',
            sendAudio: [],
            playerOptions: {
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
                    src: "http://kangaroo-app.oss-cn-hangzhou.aliyuncs.com/video/1573464578158.mp4"
               }
                ],
                poster:
                "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=673709352,371074027&fm=26&gp=0.jpg", //你的封面地址
                notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            }
          }
      },
      methods: { 
        afterRead(file, detail) {
            this.imgFile.push(file)  
            this.showImg.push(file.content)
         },
         afterVideoRead(file, detail) {
             this.sendVideo.push(file)
             let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
                const formdata = new FormData()
                formdata.append('file', this.sendVideo[0].file)
                formdata.append('type', 'video')
                axios.post('http://localhost:3001/alioss/uploadOss', formdata, config).then(res => {
                    console.log(res)
                    this.playerOptions.sources[0].src = res.data.data
                    if(res.data.code === 200) {
                        Toast.success('上传成功')
                    }
                    }).catch(err => {
                        Toast.fail('系统错误')
                    console.log(err)
                })
         },
         delVideo() {
           this.playerOptions.sources[0].src = ''
         },
         afterAudioRead(file, detail) {
               this.sendAudio.push(file)
               let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
             };
                const formdata = new FormData()
                formdata.append('file', this.sendAudio[0].file)
                formdata.append('type', 'audio')
                axios.post('http://localhost:3001/alioss/uploadOss', formdata, config).then(res => {
                    console.log(res)
                    this.audioSrc = res.data.data
                    if(res.data.code === 200) {
                        Toast.success('上传成功')
                    }
                    }).catch(err => {
                        Toast.fail('系统错误')
                    console.log(err)
                })
         },
         delAudio() {
             this.audioSrc = ''
         },
         submitData(){
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            if(this.imgFile.length > 0) {
                this.imgFile.forEach( (item, index) => {
                const formdata = new FormData()
                formdata.append('file', this.imgFile[index].file)
                formdata.append('type', 'img')
                axios.post('http://localhost:3001/alioss/uploadOss', formdata, config).then(res => {
                    console.log(res)
                    if(res.data.code === 200) {
                        Toast.success('上传成功')
                    }
                     if(this.imgFile.length === 1 ){
                         this.imgUrl = res.data.data
                     }else{
                         this.backImgList.push(res.data.data)
                         this.imgUrl = this.backImgList.join(',')
                      } 
                    }).catch(err => {
                        Toast.fail('系统错误')
                    console.log(err)
                })
            })  
          }
        },
         delBtn(index){
            if(isNaN(index) || index >= this.imgFile.length){
                return false;
            }
            let tmp = [];
            for(let i = 0; i < this.imgFile.length; i++){
                if(this.imgFile[i] !== this.imgFile[index]){
                tmp.push(this.imgFile[i]);
                }
            }
            this.imgFile = tmp;
         }
      }
}
</script>

<style lang="scss"scoped>
 .content{
     padding: 10px;
     .imgList{
         display: flex;
         flex-direction: row;
         flex-wrap: wrap; 
         .imgItem{ 
             display: flex;
             flex-direction: row;
             margin: 10px 0;
             .img{
               width: 100%;
               height: 100px; 
             }
           .delete{
             margin-left: -10px;
             margin-top: -10px;
          }
         } 
     }
     .video{
         position: relative;
      .delete{
          position: absolute;
          right: -8px;
          top: -8px;
      }
     }
     .audio{
         position: relative;
         .delete {
             position: absolute;
             right: 10px;
             top: 10px;
         }
     }
 }
</style>