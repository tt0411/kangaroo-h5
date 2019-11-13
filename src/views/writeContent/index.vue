<template>
  <div class="container">
     <van-nav-bar title="写内容" left-text=""  right-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-button slot="right" color="#12C3DF" size="large">发表</van-button>
    </van-nav-bar>
    <div class="content">
      <van-field
        class="text"
        v-model="content"
        rows="3"
        autosize
        type="textarea"
        placeholder="说点儿什么..."
      />
    </div>
    <div class="addAddress" @click="toAddAddress">
      <div>
        <van-icon name="location-o" size="20px" color="#12C3DF" v-if="address" />
        <van-icon name="location-o" size="20px" color="#5e5b5b" v-else />
      </div>
      <div>
        <span class="address" v-if="address">{{address}}</span>
        <span class="address" v-else>添加地点</span>
      </div>
    </div>
    <div class="isOpen">
      <div class="name">是否公开</div>
      <div class="switch">
        <van-switch v-model="isOpen" active-color="#12C3DF" size="18px" />
      </div>
    </div>
    <div class="tips" v-if="isOpen">
      <div>
        <van-icon name="warning" color="#12C3DF" />
      </div>
      <div style="margin-top: -2px;">
        <span class="tips-content">内容公开审核通过后，所有人可见</span>
      </div>
    </div>
    <div class="isOpenComment">
      <div class="name">是否关闭评论</div>
      <div class="switch">
        <van-switch v-model="isOpenComment" active-color="#12C3DF" size="18px" />
      </div>
    </div>
    <div class="tips" v-if="isOpenComment">
      <div>
        <van-icon name="warning" color="#12C3DF" />
      </div>
      <div style="margin-top: -2px;">
        <span class="tips-content">关闭评论后，此内容下所有人无法评论</span>
      </div>
    </div>
    <div class="theme" @click="pickTheme">
        <van-cell title="选择主题" title-style="font-size: 16px;margin-left: -5px; color: #5e5b5b;" is-link  :value="theme || '请选择主题'" />
    </div>
    <van-action-sheet v-model="showThemebox" :actions="themeList" @select="selectTheme" />
    <div class="type">
      <div class="title">选择类型</div>
      <div class="threeType">
        <div class="pic" @click="pickPic">
          <van-tag color="#f2826a" size="large" v-if="isPic">图文</van-tag>
          <van-tag color="#f2826a" size="large" plain v-else>图文</van-tag>
        </div>
        <div class="video" @click="pickVideo">
          <van-tag color="#f2826a" size="large" v-if="isVideo">视频</van-tag>
          <van-tag color="#f2826a" size="large" plain v-else>视频</van-tag>
        </div>
        <div class="audio" @click="pickAudio">
          <van-tag color="#f2826a" size="large" v-if="isAudio">音频</van-tag>
          <van-tag color="#f2826a" size="large" plain v-else>音频</van-tag>
        </div>
      </div>
    </div>

    <div class="upload" v-if="isPic">
      <Upload :type="1" ref="upload" />
    </div>
    <div class="upload" v-if="isVideo">
      <Upload :type="2" ref="upload" />
    </div>
    <div class="upload" v-if="isAudio">
      <Upload :type="3" ref="upload" />
    </div>
  </div>
</template>

<script>
import Upload from "../../components/upload";
import { Toast } from "vant";
export default {
  components: { Upload },
  data() {
    return {
      content: "",
      isPic: true,
      isVideo: false,
      isAudio: false,
      isOpen: false,
      isOpenComment: false,
      address: "",
      theme: '',
      themeId: null,
      showThemebox: false,
      themeList: [
          {id: 1, name: '那年我十八岁'},
          {id: 2, name: '致我们终将逝去的青春'},
          {id: 3, name: '实习的那一年'}
      ]
    };
  },
  mounted() {
    this.address = this.$route.query.name;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      if (!this.content) {
        Toast("请填写内容后再发表");
      } else {
        // console.log(this.$refs.upload.imgUrl, this.$refs.upload.audioSrc, this.$refs.upload.videoUrl)
        // console.log(112212)
      }
    },
    pickTheme() {
        this.showThemebox = true;
    },
    selectTheme(item) {
         this.showThemebox = false;
         this.themeId = item.id;
         this.theme = item.name;
    },
    toAddAddress() {
      this.$router.push("/addAddress");
    },
    pickPic() {
      this.isPic = !this.isPic;
      this.isVideo = false;
      this.isAudio = false;
    },
    pickVideo() {
      this.isVideo = !this.isVideo;
      this.isAudio = false;
      this.isPic = false;
    },
    pickAudio() {
      this.isAudio = !this.isAudio;
      this.isVideo = false;
      this.isPic = false;
    }
  }
};
</script>

<style lang="scss" scoped>
// 重置van-bar
.van-nav-bar {
  background: #12c3df;
  .van-nav-bar__title {
    color: #ffffff;
  }
  .van-icon {
    color: #ffffff;
    font-size: 20px;
  }
  .van-nav-bar__text {
    color: #ffffff;
  }
}
.container {
  .content {
    .text {
      font-size: 15px;
    }
  }
  .addAddress {
    display: flex;
    flex-direction: row;
    margin: 10px 0 0 8px;
    .address {
      color: #9c9a9a;
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .isOpen {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0 5px 10px;
    margin-bottom: -10px;
    border-bottom: 1px solid #f5f5f5;
    .name {
      color: #5e5b5b;
    }
    .switch {
      margin-left: 60px;
    }
  }
  .isOpenComment {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 0 5px 10px;
    margin-bottom: -10px;
    border-bottom: 1px solid #f5f5f5;
    .name {
      color: rgb(94, 91, 91);
    }
    .switch {
      margin-left: 30px;
    }
  }
  .tips {
    display: flex;
    flex-direction: row;
    margin: 15px 0 -15px 10px;
    .tips-content {
      color: #9c9a9a;
      margin-left: 5px;
      font-size: 13px;
    }
  }
  .theme{
      margin-top: 10px;
      border-bottom: 1px solid #f5f5f5;
  }
  .type {
    padding: 20px 0 10px 10px;
    .title {
      color: rgb(94, 91, 91);
      margin-bottom: 5px;
    }
    .threeType {
      display: flex;
      flex-direction: row;
      align-items: center;
      .van-tag {
        margin: 5px;
      }
    }
  }
}
</style>