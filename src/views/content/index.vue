<template>
  <common-layout> 
    <div slot="content"> 
       <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="container">
        <div class="top">
          <div class="bg">
            <img :src="imgUrl" />
          </div>
          <div class="write">
            <van-icon
              name="https://i.loli.net/2019/11/08/MPGuNnFwp936Jai.png"
              size="30px"
              @click="toWrite"
            />
          </div> 
      
          <div class="user">
            <div class="userName" v-if="isLogin">{{nickName}}</div>
            <div class="userName" v-else>未登录</div>
            <div class="avatar">
              <van-image
                width="50"
                height="50"
                :round="true"
                fit="cover"
                :src="avatar"
                v-if="isLogin"
              ></van-image>
              <van-image
                width="50"
                height="50"
                :round="true"
                fit="cover"
                :src="defaultAvatar"
                v-else
                @click="toLogin"
              ></van-image>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="contentList">
          <ContentItem :contentItem="contentList" :more="false" :playerOptions="playerOptions"/>
          </div>
        </div>
      </div>
       </van-pull-refresh> 
      <van-dialog
        v-model="show"
        title="提示"
        show-cancel-button
        confirmButtonColor="#12C3DF"
        confirmButtonText="去登录"
        @confirm="toLogin"
      >
        <div class="loginDialog">登录后才能写内容哟 ~_~</div>
      </van-dialog>
    </div>
    
  </common-layout>
</template>

<script>
import { Toast } from "vant";
import ContentItem from "../index/contentItem";
import { mapState } from "vuex";
export default {
  components: { ContentItem },
  data() {
    return {
      imgUrl: "https://i.loli.net/2019/11/08/wlkQoEpDPJAyj19.jpg",
      avatar: "",
      defaultAvatar: "https://i.loli.net/2019/11/20/aGvftlCNr7TOLKB.png",
      nickName: "",
      show: false,
      isLogin: false,
      isLoading: false,
      contentList: [],
      playerOptions: [],
    };
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
     this.$store.dispatch("user/getInfo").then(rsp => {
            if(rsp.code === 200) {
                this.nickName = this.user.userInfo.nickName;
                this.avatar = this.user.userInfo.imgUrl;
            }
        }) 
  },
  mounted() {
      this.fetchList();
  },
  methods: {
    toWrite() {
      if (localStorage.getItem("token")) {
        this.$router.push("/writeContent");
      } else {
        this.show = true;
      }
    },
    toLogin() {
      this.$router.push("/login");
    },
    onRefresh() {
        this.fetchList();
    },
    fetchList() {
       const  toast = Toast.loading({
            message: '加载中...',
            forbidClick: true
         })
      this.$store.dispatch("content/getAllOpenContent", 1000).then(rsp => {
        this.isLoading = false;
        toast.clear();
        if (rsp.code === 200) {
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
            });
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .top {
    position: relative;
    .bg {
      img {
        width: 100%;
        height: 150px;
      }
    }
    .write {
      position: absolute;
      top: 15px;
      left: 10px;
    }
    .user {
      position: absolute;
      top: 90px;
      right: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .userName {
        margin-right: 10px;
        color: #fff;
      }
    }
  }
}
.loginDialog {
  text-align: center;
  padding: 10px 0;
  color: #776d6d;
}
</style>