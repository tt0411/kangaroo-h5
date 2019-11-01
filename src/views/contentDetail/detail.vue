<template>
  <div class="content">
    <div class="content-item">
      <div class="info">
        <div class="avatar">
          <van-image width="45" height="45" :round="true" fit="cover" :src="content.avatar" />
        </div>
        <div class="name-time">
          <div class="name">{{content.nickName}}</div>
          <div class="time">发表于: {{content.create_time}}</div>
        </div>
      </div>
      <div class="three-content">
        <div class="img-content" v-if="content.img">
          <div class="text-content" v-if="content.content">{{content.content}}</div>
          <div class="imageList" v-if="content.img">
            <div v-if="content.img.length === 1">
              <van-row>
                <van-col span="24">
                  <van-image
                    :src="content.img"
                    style="width: 100%;height: 100px;"
                    @click="show = true"
                  ></van-image>
                </van-col>
              </van-row>
              <van-image-preview v-model="show" :images="content.img"></van-image-preview>
            </div>
            <div v-if="content.img.length === 2">
              <van-row gutter="5">
                <van-col span="12" v-for="(item1, index) in content.img" :key="index">
                  <van-image :src="item1" style="width: 100%;height: 100px;" @click="show = true"></van-image>
                </van-col>
              </van-row>
              <van-image-preview v-model="show" :images="content.img"></van-image-preview>
            </div>
            <div v-if="content.img.length >= 3">
              <van-row gutter="5">
                <van-col span="8" v-for="(item1, index) in content.img" :key="index">
                  <van-image :src="item1" style="width: 100%;height: 100px;" @click="show = true"></van-image>
                </van-col>
              </van-row>
              <van-image-preview v-model="show" :images="content.img"></van-image-preview>
            </div>
          </div>
        </div>
        <div class="audio-content" v-if="content.audio">
          <div class="text-content" v-if="content.content">{{content.content}}</div>
          <audio :src="content.audio" controls="controls"></audio>
        </div>
        <div class="video-content" v-if="content.video">
          <div class="text-content" v-if="content.content">{{content.content}}</div>
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
    <ListItem :content="content" />
  </div>
</template>

<script>
import ListItem from "./listItem.vue";
export default {
  components: { ListItem },
  data() {
    return {
      show: false,
      playerOptions: {},
      content: {
        id: 1,
        nickName: "李易峰",
        avatar:
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2967487759,252864316&fm=26&gp=0.jpg",
        create_time: "2019-10-12 11:03:27",
        content: `我们城里九十平的房子，如果可以重新装修，我希望改造的有，可以说几乎全部。
                        从玄关开始，玄关那里，鞋柜不要到顶，柜子可以全屋定制，质量好点，选择原木色。
                        和白色。混合。 鞋柜做半截。上面可以买挂钩，挂东西，比较实用。半截柜，还可以放
                        小盆栽装点，也很美貌。 厨房，上面柜子除了包住油烟机和水表箱的，其他不做...`,
        audio: "",
        video: "",
        save: 3,
        comment: 3,
        mark: 2,
        img: [
              "https://kangaroo-app.oss-cn-hangzhou.aliyuncs.com/1571905601259.png?Expires=1572574408&OSSAccessKeyId=TMP.hfUQ6ApZSVaBVCr8Vkf1rjCGT5LzqNtpVA11Avyj2YsXnEWEMrR9juGYAqrNb7oW8tz8YhhJW1K1uzVCfp9i1yP76Uoav9bCLUaRLkt7d1gPWcuoJvjHw4yfjuXi6L.tmp&Signature=hZXZiYk7Ogh8rbN2vW0g2IiF4F8%3D",
              "https://kangaroo-app.oss-cn-hangzhou.aliyuncs.com/1571905601267.png?Expires=1572574449&OSSAccessKeyId=TMP.hfUQ6ApZSVaBVCr8Vkf1rjCGT5LzqNtpVA11Avyj2YsXnEWEMrR9juGYAqrNb7oW8tz8YhhJW1K1uzVCfp9i1yP76Uoav9bCLUaRLkt7d1gPWcuoJvjHw4yfjuXi6L.tmp&Signature=CYFim94Vor1MtXa%2BWa8sUtKSb8Q%3D",
              "https://kangaroo-app.oss-cn-hangzhou.aliyuncs.com/1571905711338.png?Expires=1572574462&OSSAccessKeyId=TMP.hfUQ6ApZSVaBVCr8Vkf1rjCGT5LzqNtpVA11Avyj2YsXnEWEMrR9juGYAqrNb7oW8tz8YhhJW1K1uzVCfp9i1yP76Uoav9bCLUaRLkt7d1gPWcuoJvjHw4yfjuXi6L.tmp&Signature=PsCLlAsOICRNs%2FYl82Ec2ex55RQ%3D",
              "https://kangaroo-app.oss-cn-hangzhou.aliyuncs.com/1571905711350.png?Expires=1572574477&OSSAccessKeyId=TMP.hfUQ6ApZSVaBVCr8Vkf1rjCGT5LzqNtpVA11Avyj2YsXnEWEMrR9juGYAqrNb7oW8tz8YhhJW1K1uzVCfp9i1yP76Uoav9bCLUaRLkt7d1gPWcuoJvjHw4yfjuXi6L.tmp&Signature=7Pn1wWkxjVDBgW9J5mx7mj0ljBs%3D",
              "https://kangaroo-app.oss-cn-hangzhou.aliyuncs.com/1571905711355.png?Expires=1572574496&OSSAccessKeyId=TMP.hfUQ6ApZSVaBVCr8Vkf1rjCGT5LzqNtpVA11Avyj2YsXnEWEMrR9juGYAqrNb7oW8tz8YhhJW1K1uzVCfp9i1yP76Uoav9bCLUaRLkt7d1gPWcuoJvjHw4yfjuXi6L.tmp&Signature=S%2Byj2DYK29I8O4pAJWxoEbbTStw%3D",
              "https://kangaroo-app.oss-cn-hangzhou.aliyuncs.com/1571905932616.png?Expires=1572574518&OSSAccessKeyId=TMP.hfUQ6ApZSVaBVCr8Vkf1rjCGT5LzqNtpVA11Avyj2YsXnEWEMrR9juGYAqrNb7oW8tz8YhhJW1K1uzVCfp9i1yP76Uoav9bCLUaRLkt7d1gPWcuoJvjHw4yfjuXi6L.tmp&Signature=Li9vZmLgSgaTu2BywWusqE2w040%3D", 
          ],
      }
    };
  },
  created() {
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
          src: this.content.video
        }
      ],
      poster:
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=673709352,371074027&fm=26&gp=0.jpg", //你的封面地址
      notSupportedMessage: "此视频暂无法播放，请稍后再试"
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  background: #ffffff;
  height: 100vh;
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