<template>
  <common-layout>
      <div slot="content">
          <div class="container">
              <div class="top">
              <div class="bg">
                  <img :src="imgUrl"/>
              </div>
              <div class="write">
                  <van-icon name="https://i.loli.net/2019/11/08/MPGuNnFwp936Jai.png" size="30px"  @click="toWrite"/>
              </div>
              <div class="user">
                  <div class="userName">李喋喋</div>
                  <div class="avatar">
                      <van-image width="50" height="50" :round="true" fit="cover" :src="avatar"></van-image>
                  </div>
              </div>
              </div>
              <div class="content">
                  <div class="contentList">
                      <ContentItem :more="false"/>
                  </div>
              </div>
          </div>
      </div>
  </common-layout>
</template>

<script>
import {Toast} from 'vant' 
import ContentItem from '../index/contentItem'
export default {
    components: { ContentItem },
       data() {
           return {
               imgUrl: 'https://i.loli.net/2019/11/08/wlkQoEpDPJAyj19.jpg',
               avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2967487759,252864316&fm=26&gp=0.jpg',
           }
       },
       methods: {
           toWrite() {
               this.$router.push('/writeContent')
           }
       }
}
</script>

<style lang="scss" scoped>
.container {
    .top{
       position: relative;
    .bg{
        img{
            width: 100%;
            height: 150px;
        }
    }
    .write{
        position: absolute;
        top: 15px;
        left: 10px;
    }
    .user{
        position: absolute;
        top: 90px;
        right: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .userName{
            margin-right: 10px;
            color: #fff;
        }
    }
}
}
</style>