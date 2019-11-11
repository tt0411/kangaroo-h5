<template>
  <common-layout>
      <div slot="content">
          <div class="container">
              <div class="content">
                  <van-field
                    class="text"
                    v-model="content"
                    rows="5"
                    autosize
                    type="textarea"
                    placeholder="说点儿什么..."
                />
              </div>  
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
              
          </div>
      </div>
  </common-layout>
</template>

<script>
export default {
    data() {
        return {
            content: '',
            isPic: true,
            isVideo: false,
            isAudio: false,
        }
    },
    methods: {
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
}
</script>

<style lang="scss" scoped>
.container {
   .content{
     margin: 5px;
     .text{
         font-size: 16px;
     }
   }
   .type {
       padding: 10px;
       .title{
           color: rgb(94, 91, 91);
           margin-bottom: 5px;
       }
       .threeType{
           display: flex;
           flex-direction: row;
           align-items: center;
         .van-tag{
           margin: 5px;
          }
       }
      
   }
}
</style>