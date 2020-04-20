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
          <van-image width="45" height="45" :round="true" fit="cover" :src="item.avatar"/>
        </div>
        <div class="name-time" @click="toDetail(item)">
          <div class="name">{{item.nickName}}</div>
          <div class="time">发表于: {{item.create_time}}</div>
        </div>
        <div class="sign">
         <van-tag mark type="primary" v-if="item.status == 1 && item.flag == 0">待审核</van-tag>
         <van-tag mark type="success" v-if="item.status == 1 && item.flag == 1">审核通过</van-tag>
         <van-tag mark type="danger" v-if="item.status == 1 && item.flag == 2">审核未通过</van-tag>
         <van-tag mark type="warning" v-if="item.status == 0 && item.flag == 3">不公开</van-tag>
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
                    style="width: 100%;" fit="cover"
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
       <div class="remark" v-if="item.remark">
        审核意见： {{item.remark}}
      </div>
      </div>
     
    </div>
  </div>
  <div v-else>
    <Empty :type="4"/>
  </div>
</div>
</template>

<script>
import Empty from '../../components/empty'
import {Dialog, Toast} from 'vant'
export default {
  components: { Empty },
  props: {
     contentItem: {
       type: Array,
       default: []
     },
     playerOptions: {
       type: Array,
       default: []
     },
   },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    toDetail(item) { 
        if(item.status == 1 && item.flag == 1) {
            this.$store.commit('content/changeIsComment', item.is_comment)
            this.$store.commit('content/changeAuthorId', item.uid)
            this.$router.push({ path: "/detail", query: { id: item.id } });
        }
    },
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
      justify-content: space-between;
      align-items: center;
      .name-time {
        margin-left: 10px;
        flex:1;
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
      .remark {
        width: 100%;
        padding: 10px;
        margin-left: -10px;
        background-color: #eeeeee;
        color: #999999;
        max-height: 50px;
        overflow-y: auto;
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
</style>