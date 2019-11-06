<template>
  <base-layout>
   <div slot="content">
     <div class="container"> 
        <div class="setting" @click="setting">
          <van-icon name="setting-o" color="#ffffff" size="20px"/>
      </div>
      <div class="bg-user">
        <div class="avatar">
           <van-image width="60" height="60" :round="true" fit="cover" :src="imgUrl" />
        </div>
        <div class="userName">{{nickName}}</div>
        <div class="signature">个性签名：{{signature}}</div>
      </div>
    
      <div class="box">
          <div class="myContent">
            <div class="contents">我的内容</div>
            <div class="content-count">
              <van-tag color="#ffe1e1" text-color="#ad0000" size="large">21</van-tag>
            </div>
          </div>
          <div class="myTheme">
            <div class="themes">我的主题</div>
            <div class="theme-count">
               <van-tag color="#ffe1e1" text-color="#ad0000" size="large">3</van-tag>
            </div>
          </div>
           <div class="getMark">
            <div class="marks">获得点赞</div>
            <div class="mark-count">
               <van-tag color="#ffe1e1" text-color="#ad0000" size="large">321</van-tag>
            </div>
          </div>
           <div class="getSave">
            <div class="saves">获得收藏</div>
            <div class="save-count">
               <van-tag color="#ffe1e1" text-color="#ad0000" size="large">76</van-tag>
            </div>
          </div>
      </div>  
      <div>
        <van-tabs v-model="active" animated color="#12C3DF">
          <van-tab title="喜欢">
            <ContentItem :like="true" :more="false"/>
          </van-tab>
          <van-tab title="收藏">

          </van-tab>
      </van-tabs>
      </div>  
     </div>
   </div>
  </base-layout>
</template>

<script>
import ContentItem from '../index/contentItem'
export default {
  components: { ContentItem },
    data(){
        return {
          active: 0,
          imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2967487759,252864316&fm=26&gp=0.jpg',
          nickName: '李易峰',
          signature: '2019继续加油！'
        }
    },
    methods: {
      setting() {
        this.$router.push('/setting')
      }
    }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
.bg-user {
 // background-image: linear-gradient(to right, rgb(109, 211, 226) ,rgb(6, 192, 221));
  background-color: #12C3DF;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar{
    margin-top: 10px;
  }
  .userName{
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    margin: 5px;
  }
  .signature{
    color: #ffffff;
    font-size: 14px;
  }
}
.setting{
  position: absolute;
  right: 30px;
}
.box{
  background-color: #ffffff;
  height: 80px;
  margin-top: -40px;
  color: #888484;
  width: 80%;
  margin-left: 10%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .myContent{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    .contents{
      margin-bottom: 5px;
    }
  }
  .myTheme{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    .themes{
      margin-bottom: 5px;
    }
  }
  .getMark{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    .marks{
      margin-bottom: 5px;
    }
  }
  .getSave{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .saves{
      margin-bottom: 5px;
    }
  }
}
}
</style>