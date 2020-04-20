<template>
  <base-layout>
     <div slot="top">
         <div class="header">
         <van-search
            placeholder="请输入搜索关键词"
            shape="round"
            @focus="toSearch"/>

         <div class="bg_index">
            <van-swipe :autoplay="5000" indicator-color="white">
                <van-swipe-item v-for="(item, index) in swiperList" :key="index">
                    <img  :src="item.imgSrc"/>
                </van-swipe-item>
            </van-swipe>
         </div>
         <van-notice-bar text="袋鼠空间1.0上线啦！" left-icon="volume-o" />
        <van-sticky>
         <div class="menu">
            <van-grid :border="false" :column-num="4">
                <van-grid-item v-for="(item, index) in menuList" :key="index" @click="iconGo(item)">
                    <van-image  width="40" height="40" :round="true" fit="cover" :src="item.icon" />
                   <div class="menu-title">{{item.text}}</div>
                </van-grid-item>
            </van-grid>
         </div>
         <div class="f5"></div>
          <div class="new-content">
               <div class="content-title">
                   <div class="s"></div>
                   <div class="news">最新内容</div>
               </div>
               <div class="more-content" v-if="contentList.length > 0">
                   <div class="more" @click="moreContent">查看更多</div>
                   <div class="more-icon">
                       <van-icon name="more-o" size="18px" color="#a8a7a7"/>
                   </div>
               </div>
         </div>
        </van-sticky>
     </div> 
   </div>
     <div slot="content" class="container">
     <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
       <ContentItem :contentItem="contentList" :playerOptions="playerOptions"/>
     </van-pull-refresh> 
      <van-dialog v-model="show" title="提示" show-cancel-button confirmButtonColor="#6190e8" confirmButtonText="去登录" @confirm="toLogin">
         <div class="loginDialog">{{tipMsg}}</div>
        </van-dialog>
     </div>
  </base-layout>
</template>

<script>
import ContentItem from '../components/contentItem'
import { Toast } from 'vant';
import { mapState } from 'vuex';
export default {
    components: { ContentItem },
    data(){
       return {
           createTheme: '',
           writeContent: '',
           textContent: true,
           audioContent: true,
           videoContent: true,
           show: false,
           isLoading: false,
       swiperList: [
           {id: 1, imgSrc: require('../../assets/1.jpg')},
           {id: 2, imgSrc: require('../../assets/2.jpg')},
           {id: 3, imgSrc: require('../../assets/3.jpg')},
       ],
       menuList: [
           { icon: require('../../assets/m1.png'), text: '广场'},
           { icon: require('../../assets/m2.png'), text: '创主题'},
           { icon: require('../../assets/m3.png'), text: '写内容'},
           { icon: require('../../assets/m4.png'), text: '功能待定'},
       ],
       contentList: [],
       playerOptions: [],
       tipMsg: '',
     }
   },
   computed: {
       ...mapState(['content'])
   },
//    beforeRouteEnter(to, from, next) {
//     next(vm => {
//       // 通过 `vm` 访问组件实例
//       if (from.name === 'theme' || from.name === 'user' || from.name === 'myContent') {
//         vm.content.scrollTop = 0
//         vm.fetchList()
//         console.log(111)
//       } else {
//         vm.refreshList()
//         console.log(222)
//       }
//     })
//   },
   created() {
       this.fetchList();
       this.$store.dispatch('user/getInfo');
   },
   methods: {
       fetchList() {
        const  toast = Toast.loading({
            message: '加载中...',
            forbidClick: true
         })
          this.$store.dispatch('content/getAllOpenContent', 10).then(rsp => {
            this.isLoading = false;
            toast.clear();
           if(rsp.code === 200) {
               this.contentList = rsp.list;
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
                    })
                })
             }
          })
       },
       toSearch(){
           this.$router.push('/search')
       },
       moreContent() {
          this.$router.push('/content') 
       },
       toLogin() {
           this.$router.push('/login')
       },
       onRefresh() {
           this.fetchList();
       },
    //    refreshList() {
    //      this.fetchList();
    //      this.$nextTick(() => {
    //       this.$el.querySelector('.container').parentNode.scrollTop = this.content.scrollTop
    //      })
    //    },
    //     getScrollTop() {
    //         let top = this.$el.querySelector('.container').parentNode.scrollTop
    //         this.$store.commit('content/changeScrollTop', top)
    //     },
       iconGo(item) {
           if(item.text === '创主题') {
                if(localStorage.getItem('token')){
                  this.$router.push({ path: '/theme', query: { isWrite: true}})
               }else{
                  this.tipMsg = '登录后才能进行创主题哟 ~_~'
                  this.show = true;
               }   
             
           }
           if(item.text === '广场') {
               this.$router.push('/content')
           }
           if(item.text === '写内容') {
               if(localStorage.getItem('token')){
                  this.$router.push('/writeContent') 
               }else{
                  this.tipMsg = '登录后才能进行写内容哟 ~_~'
                  this.show = true;
               }   
           }
           if(item.text === '功能待定') {
               Toast('功能待定中...')
           }
       }
   }
}
</script>

<style lang="scss" scoped>
.f5{
    width: 100%;
    height: 5px;
    background-color: #f5f5f5;
}
.header{
    background-color: #f5f5f5;
    .bg_index{
     margin-bottom: -4px;
     img{
         width: 100%;
         height: 150px;
     }
 }
 .menu{
      .menu-title{
          margin-top: 5px;
      }
 }
}
.new-content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #ffffff;
    border-bottom: 1px solid #f5f5f5;
    .content-title{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    .s{
        width: 5px;
        height: 25px;
        background-color: #6190e8;  
        border-radius: 5px;
        margin: 5px 10px;
    }
    .news{
        font-size: 16px;
    } 
 }
 .more-content{
     display: flex;
     flex-direction: row;
     align-items: center;
     margin-right: 10px;
     .more{
          color: #a8a7a7;
          margin-right: 5px;
     }
     .more-icon{
         margin-top: 5px;
     }
 }   
}
.loginDialog{
    text-align: center;
    padding: 10px 0;
    color: #776d6d;
}

</style>