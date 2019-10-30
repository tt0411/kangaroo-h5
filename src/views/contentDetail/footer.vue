<template>
  <div class="footer">
    <div class="input">
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="说点什么...(50字以内)"
      />
    </div>
    <div class="send">
      <van-button color="#12C3DF" size="small" round @click="sendMessage" v-if="message">发布</van-button>
    </div>
    <div class="save_mark">
      <div class="save" @click="toSave">
        <van-icon name="star" size="22px" color="#12C3DF" v-if="isSave" />
        <van-icon name="star-o" size="22px" color="#afaeae" v-else />
      </div>
      <div class="mark" @click="toMark">
        <van-icon name="like" size="22px" color="#12C3DF" v-if="isMark" />
        <van-icon name="like-o" size="22px" color="#afaeae" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      message: "",
      isSave: false,
      isMark: false
    };
  },
  methods: {
    sendMessage() {},
    toSave() {
      this.isSave = !this.isSave;
      if (this.isSave) {
        Toast({
          message: "收藏成功",
          icon: "star-o",
          color:"#12C3DF"
        });
      } else {
        Toast("取消收藏");
      }
    },
    toMark() {
      this.isMark = !this.isMark;
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eeeeee;
  .send {
    margin-right: 10px;
  }
  .save_mark {
    display: flex;
    flex-direction: row;
    align-items: center;
    .save {
      margin-right: 20px;
    }
    .mark {
      margin-right: 20px;
    }
  }
}
</style>