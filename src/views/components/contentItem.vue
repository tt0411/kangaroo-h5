<template>
  <div class="content">
    <div v-if="contentItem.length > 0">
    <div
      class="content-item"
      v-for="(item, index) in contentItem"
      :key="index"
    >
      <div class="info" >
        <div class="avatar">
          <van-image width="45" height="45" :round="true" fit="cover" :src="item.imgUrl"/>
        </div>
        <div class="name-time" @click="toDetail(item)">
          <div class="name">{{item.nickName}}</div>
          <div class="time">发表于: {{item.create_time}}</div>
        </div>
        <div class="delBtn">
          <!-- <van-icon name="delete" size="20px"  v-if="isDel" @click="delContent(item)"/> -->
          <van-icon name="more-o" size="20px"  v-if="isDel" @click="settingShow(item)"/>
        </div>
      </div>
      <div class="three-content" @click="toDetail(item)">
        <div class="img-content">
          <div class="text-content" v-if="item.context">{{item.context}}</div>
          <div class="imageList" v-if="item.img">
            <div v-if="item.img.length === 1">
              <van-row>
                <van-col span="24">
                  <van-image
                    :src="item.img[0]"
                    style="width: 100%;" 
                    fit="cover"
                    @click="show = true"
                  ></van-image>
                </van-col>
              </van-row>
            </div>
            <div v-if="item.img.length === 2">
              <van-row gutter="5">
                <van-col span="12" v-for="(item1, index) in item.img" :key="index">
                  <van-image :src="item1" style="width: 100%;" fit="cover" @click="show = true"></van-image>
                </van-col>
              </van-row>
            </div>
            <div v-if="item.img.length >= 3">
              <van-row gutter="5">
                <van-col span="8" v-for="(item1, index) in item.img" :key="index">
                  <van-image :src="item1" style="width: 100%;" fit="cover" @click="show = true"></van-image>
                </van-col>
              </van-row>
            </div>
            <div class="address" v-if="item.address">
              <div class="address-icon">
                <van-icon name="location-o" color="#888585" size="20px" />
              </div>
              <div class="address-name">{{item.address}}</div>
            </div>
          </div>
        </div>
        <div class="audio-content" v-if="item.audio">
          <div class="text-content" v-if="item.content">{{item.content}}</div>
          <audio :src="item.audio" controls="controls"></audio>
          <div class="address" v-if="item.address">
            <div class="address-icon">
              <van-icon name="location-o" color="#888585" size="20px" />
            </div>
            <div class="address-name">{{item.address}}</div>
          </div>
        </div>
        <div class="video-content" v-if="item.video">
          <div class="text-content" v-if="item.content">{{item.content}}</div>
          <video-player
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions[index]"
            :playsinline="true"
            x5-playsinline="true"
            webkit-playsinline="true"
            x5-video-player-type="h5"
            customEventName="customstatechangedeventname"
          ></video-player>
          <div class="address" v-if="item.address">
            <div class="address-icon">
              <van-icon name="location-o" color="#888585" size="20px" />
            </div>
            <div class="address-name">{{item.address}}</div>
          </div>
        </div>
      </div>
      <div class="content-options" v-if="countItem" @click="toDetail(item)">
        <div class="save">
          <van-icon name="star-o" size="20px" />
          <div class="count">{{item.save}}</div>
        </div>
        <div class="comment">
          <van-icon name="chat-o" size="20px" />
          <div class="count">{{item.comment}}</div>
        </div>
        <div class="mark">
          <van-icon name="like-o" size="20px"/>
          <div class="count">{{item.mark}}</div>
        </div>
      </div>
    </div>
    <div class="seeMore" v-if="more">
      <span @click="seeMore">查看更多</span>
    </div>
  </div>
  <div v-else>
    <Empty :type="4"/>
  </div>

  <van-dialog v-model="isSetting" title="操作" :showConfirmButton='false' :closeOnClickOverlay='true' confirmButtonColor="#6190e8">
      <div class="setting">
          <div class="item">
            <div class="label">是否删除此内容</div>
            <div class="chart">
              <van-icon name="delete" size="20px" style="margin-left: -30px;" color="#6190e8"  @click="delContent"/>
            </div>
          </div>
          <div class="item">
            <div class="label">是否开启评论</div>
            <div class="chart">
              <van-switch v-model="isComment" active-color="#6190e8" @change="commentChange" size="20px"/>
            </div>
          </div>
          <div class="item">
            <div class="label">是否公开内容</div>
            <div class="chart">
              <van-switch v-model="isOpen" active-color="#6190e8" @change="openChange" size="20px"/>
            </div>
          </div>
      </div>
  </van-dialog>

</div>
</template>

<script>
import Empty from '../../components/empty'
import { Dialog, Toast } from 'vant'
import { isCommentContent } from '../../api/content'
export default {
  components: { Empty },
  props: {
     more: {
       type: Boolean,
       default: true
     },
     countItem: {
       type: Boolean,
       default: true
     },
     contentItem: {
       type: Array,
       default: []
     },
     playerOptions: {
       type: Array,
       default: []
     },
     isDel: {
       type: Boolean,
       default: false
     }
   },
  data() {
    return {
      show: false,
      isSetting: false,
      isComment: false,
      isOpen: false,
      id: null,
      flag: null,
    }
  },
  methods: {
    seeMore() {
      this.$router.push('/content')
    },
    commentChange() {
      let params = {
          id: this.id, 
          is_comment: this.isComment ? 1 : 0
        }
      isCommentContent(params).then(rsp => {
          if(rsp.code === 200) {
             Toast.success(rsp.msg)
             this.$emit('refreshContentList')
             this.isSetting = false
           }
      }) 
    },
    openChange() {
       let params = {
          id: this.id, 
          status: this.isOpen ? 1 : 0,
          flag: this.isOpen ? 1 : 3,
        }
        this.$store.dispatch('content/isDelContent',params).then(rsp => {
           if(rsp.code === 200) {
             Toast.success(rsp.msg)
             this.$emit('refreshContentList')
             this.isSetting = false
           }
         })
    },
    settingShow(item) {
      this.isSetting = true
      this.id = item.id
      this.isComment = item.is_comment === 1 ? true : false
      this.isOpen = item.status === 1 ? true : false
      this.flag = item.flag
    },
    toDetail(item) { 
      this.$store.commit('content/changeIsComment',item.is_comment)
      this.$store.commit('content/changeAuthorId', item.uid)
      this.$router.push({ path: "/detail", query: { id: item.id } });
    },
    delContent(){
       Dialog.confirm({
        title: '提示',
        message: '是否要删除此内容'
      }).then(() => {
        let params = {
          id: this.id, 
          status: 2,
          flag: this.flag
        }
         this.$store.dispatch('content/isDelContent',params).then(rsp => {
           if(rsp.code === 200) {
             Toast.success(rsp.msg)
             this.$emit('refreshContentList')
             this.isSetting = false
           }
         })
      }).catch(() => {
        // on cancel
      });
     }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background: #ffffff;
   font-size: 0.15rem;
  .content-item {
    padding: 8px;
    border-bottom: 1px solid #f5f5f5;
    .info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .name-time {
        flex: 1;
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
      .address {
        display: flex;
        flex-direction: row;
        margin: 10px 0;
        .address-name {
          margin-left: 5px;
          color: #888585;
          font-size: 14px;
          background-color: #faf7f7;
          border-radius: 10px;
          padding: 2px 5px;
        }
      }
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
    .content-options {
      padding: 5px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .save {
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        .count {
          margin-top: 4px;
          margin-left: 3px;
        }
      }
      .comment {
        display: flex;
        flex-direction: row;
        .count {
          margin-top: 4px;
          margin-left: 3px;
        }
      }
      .mark {
        margin-right: 20px;
        display: flex;
        flex-direction: row;
        .count {
          margin-top: 4px;
          margin-left: 3px;
        }
      }
    }
  }
}
.seeMore {
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
  span {
    color: #4b4b4b;
  }
}

.setting {
  padding: 10px;
  .item {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    .label {
      color:#585656;
      font-size: 14px;
    }
  }
}
</style>