<template>
  <div class="footer">
    <div class="input">
      <van-field
        style="background-color:#f5f5f5;font-size: 16px;"
        :disabled="is_comment"
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        maxlength="50"
        :placeholder="is_comment ? '作者关闭了评论' : '来评论啦...'"
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
import {mapState} from 'vuex';

export default {
  data() {
    return {
      message: "",
      isSave: false,
      isMark: false,
      is_comment: false,
      cid: null
    };
  },
  computed: {
    ...mapState(['content'])
  },
  mounted() {
      this.is_comment = this.content.is_comment;
      this.cid = this.content.content_id;
  },
  methods: {
    sendMessage() {
      let params = {
        content: this.message,
        cid: this.cid
      }
      this.$store.dispatch('content/addComment', params).then(rsp => {
          if(rsp.code === 200) {
              let msg = rsp.msg;
              this.$store.dispatch('content/getCommentById', this.cid).then(rsp => {
                if(rsp.code === 200) {
                   Toast.success(msg);
                   this.message = '';
                }
              })
          }
      })
    },
    toSave() {
      let params = {
        cid: this.cid,
        status: this.isSave ? 0 : 1,
      }
      this.$store.dispatch('content/isSaveContent', params).then(rsp => {
        if(rsp.code === 200) {
          if(!this.isSave) {
            Toast({
            message: rsp.msg,
            icon: 'star-o'
          });
           this.isSave = !this.isSave;
        }else{
          Toast(rsp.msg)
        }
        }else{
          Toast.fail(rsp.msg)
        }
      })
    },
    toMark() {
      let params = {
        cid: this.cid,
        status: this.isMark ? 0 : 1
      }
      this.$store.dispatch('content/isMarkContent', params).then(rsp => {
        if(rsp.code === 200) {
          this.isMark = !this.isMark;
        }else{
          Toast.fail(rsp.msg)
        }
      })
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
  .input{
    flex: 5;
  }
  .send {
    margin-right: 10px;
    margin-left: 5px;
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
