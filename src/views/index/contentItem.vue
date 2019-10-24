<template>
     <div class="content">
             <div class="content-item" v-for="(item, index) in contentList" :key="index">
                 <div class="info">
                        <div class="avatar">
                            <van-image width="45" height="45" :round="true" fit="cover" :src="item.avatar" />
                        </div>
                        <div class="name-time">
                            <div class="name">{{item.nickName}}</div>
                            <div class="time">发表于: {{item.create_time}}</div>
                        </div>
                 </div>
                 <div class="three-content">
                     <div class="img-content" v-if="item.img">
                       <div class="text-content" v-if="item.content">
                           {{item.content}}
                       </div>
                       <div class="imageList" v-if="item.img">
                          <div v-if="item.img.length === 1">
                              <van-row>
                                <van-col span="24">
                                    <van-image :src="item.img[0]" style="width: 100%;height: 100px;" @click="show = true"></van-image>    
                                </van-col>
                             </van-row>
                             <van-image-preview v-model="show" :images="item.img"></van-image-preview>
                          </div>
                        <div v-if="item.img.length === 2">
                            <van-row gutter="5">
                            <van-col span="12" v-for="(item1, index) in item.img" :key="index">
                                <van-image :src="item1" style="width: 100%;height: 100px;"  @click="show = true"></van-image>   
                            </van-col>
                            </van-row>
                            <van-image-preview v-model="show" :images="item.img"></van-image-preview>
                        </div>
                         <div v-if="item.img.length >= 3">
                            <van-row gutter="5">
                            <van-col span="8" v-for="(item1, index) in item.img" :key="index">
                                <van-image :src="item1" style="width: 100%;height: 100px;"  @click="show = true"></van-image>   
                            </van-col>
                            </van-row>
                            <van-image-preview v-model="show" :images="item.img"></van-image-preview>
                        </div>
                       </div>
                     </div>
                     <div class="audio-content" v-if="item.audio">
                          <div class="text-content" v-if="item.content">
                             {{item.content}}
                          </div>
                         <audio :src="item.audio"  controls="controls"></audio>
                     </div>
                     <div class="video-content" v-if="item.video">
                          <div class="text-content" v-if="item.content">
                             {{item.content}}
                          </div>
                           <video-player  class="video-player-box"
                            ref="videoPlayer"
                             :options="playerOptions[index]"
                             :playsinline="true"
                             x5-playsinline="true"
                             webkit-playsinline="true"
                             x5-video-player-type="h5" 
                            customEventName="customstatechangedeventname"
                          >
                   </video-player>
                     </div>
                 </div>
                   <div class="content-options">
                         <div class="save">
                             <van-icon name="star-o" size="20px"/>
                             <div class="count">{{item.save}}</div>
                         </div>
                         <div class="comment">
                             <van-icon name="chat-o" size="20px" /> 
                             <div class="count">{{item.comment}}</div>
                         </div>
                         <div class="mark">
                             <van-icon name="like-o" size="20px" />
                             <div class="count">{{item.mark}}</div>
                         </div>
                    </div>
             </div>
             <div class="seeMore">
                 <span @click="seeMore">查看更多</span>
             </div>
         </div>
</template>

<script>
export default {
    data() {
        return{
            show: false,
            playerOptions: [],
            contentList: [
            { 
                id: 1, 
                nickName: '李易峰', 
                avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2967487759,252864316&fm=26&gp=0.jpg',
                create_time: '2019-10-12 11:03:27', 
                content: `我们城里九十平的房子，如果可以重新装修，我希望改造的有，可以说几乎全部。
                        从玄关开始，玄关那里，鞋柜不要到顶，柜子可以全屋定制，质量好点，选择原木色。
                        和白色。混合。 鞋柜做半截。上面可以买挂钩，挂东西，比较实用。半截柜，还可以放
                        小盆栽装点，也很美貌。 厨房，上面柜子除了包住油烟机和水表箱的，其他不做...`, 
                audio: '',
                video: '',
                save: 121,
                comment: 23,
                mark: 678,
                img: [
                    "http://pyku15h15.bkt.clouddn.com/1.jpg",
                    "http://pyku15h15.bkt.clouddn.com/0.jpg",
                    "http://pyku15h15.bkt.clouddn.com/1.jpg",
                    "http://pyku15h15.bkt.clouddn.com/0.jpg"
                ],
            },
            { 
                id: 2, 
                nickName: '张三丰', 
                avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=320178652,790985626&fm=26&gp=0.jpg',
                create_time: '2019-10-11 16:16:01', 
                content: `测试我们城里九十平的房子，如果可以重新装修，我希望改造的有，可以说几乎全部。 从玄关开始，
                玄关那里，鞋柜不要到顶，柜子可以全屋定制，质量好点，选择原木色。和白色。混合。 鞋柜做半截。上面可以
                买挂钩，挂东西，比较实用。半截柜，还可以放小盆栽装点，也很美貌。 厨房，上面柜子除了包住油烟机和水表
                箱的，其他不做...`, 
                audio: 'http://pyku15h15.bkt.clouddn.com/audio.mp3',
                video: '',
                save: 11,
                comment: 2,
                mark: 12,
                img: null,
            },
            { 
                id: 3, 
                nickName: '韩一波', 
                avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3276179142,1686381254&fm=26&gp=0.jpg',
                create_time: '2019-10-10 09:03:25', 
                content: `春天来了，我们要去郊外踏春，还要在餐桌上“咬春”。作为一个热爱生活的吃货，那就
                以春天之名来一道家常随意卷饼吧！ 春天终于来了！虽然冬天的寒意还没有完全褪去，但万
                物复苏，总是给人欣欣向荣的好心情呀！该上班的上班，该上学的上学，该做的工作还是要
                继续，该...`, 
                audio: '',
                video: 'http://pyku15h15.bkt.clouddn.com/movie.mp4',
                save: 78,
                comment: 34,
                mark: 45,
                img: null
            }  
          ]
        }
    },
    created(){
        this.contentList.forEach((item, index) => {
            this.playerOptions.push({
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                src: item.video//url地址
                }],
                poster: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=673709352,371074027&fm=26&gp=0.jpg", //你的封面地址
                // width: document.documentElement.clientWidth, //播放器宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            })
        })
    },
    methods: {
        seeMore() {
            console.log('查看更多')
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    .content-item{
        padding: 8px;
        border-bottom: 1px solid #f5f5f5;
        .info{
            display: flex;
            flex-direction: row;
            align-items: center;
            .name-time{
                display: flex;
                flex-direction: column;
                margin-left: 10px;
                .name{
                    font-size: 16px;
                    margin-bottom: 5px;
                    color: #585656;
                }
                .time{
                    color: #a8a7a7;
                }
            }
        }
        .three-content{
            margin-top: 10px; 
            .text-content{
                text-indent: 20px;
                margin-bottom: 10px;
             }
            .img-content{
             margin-bottom: 10px;
            }
            .audio-content{
                width: 100%;
                margin-bottom: 10px;
                audio{
                    width: 100%;
                }
            }
            .video-content{
                width: 100%;
                margin-bottom: 10px;
            }
          }
            .content-options{
                padding: 5px 0;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .save{
                    margin-left: 20px;
                    display: flex;
                    flex-direction: row;
                    .count{
                        margin-top: 4px;
                        margin-left: 3px;
                    }
                }
                .comment{
                    display: flex;
                    flex-direction: row;
                    .count{
                        margin-top: 4px;
                        margin-left: 3px;
                    }
                }
                .mark{
                      margin-right: 20px;
                    display: flex;
                    flex-direction: row;
                    .count{
                        margin-top: 4px;
                        margin-left: 3px;
                    }
                }   
         }
    }
}
.seeMore{
    text-align: center;
    margin-top: 20px;
    span{
        color: #4b4b4b;
    }
}
</style>