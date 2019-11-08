<template>
  <base-layout>
     <div slot="top">
         <div class="header">
         <van-search
            placeholder="请输入搜索关键词"
            shape="round"
            @focus="toSearch"/>

         <div class="bg_index">
            <van-swipe :autoplay="5000" indicator-color="white">
                <van-swipe-item v-for="(item, index) in swiperList" :key="index">
                    <img  :src="item.imgSrc"/>
                </van-swipe-item>
            </van-swipe>
         </div>
         <van-notice-bar text="袋鼠空间1.0上线啦！" left-icon="volume-o" />
        <van-sticky>
         <div class="menu">
            <van-grid :border="false" :column-num="4">
                <van-grid-item v-for="(item, index) in menuList" :key="index" @click="iconGo(item)">
                    <van-image  width="40" height="40" :round="true" fit="cover" :src="item.icon" />
                   <div class="menu-title">{{item.text}}</div>
                </van-grid-item>
            </van-grid>
         </div>
         <div class="f5"></div>
          <div class="new-content">
               <div class="content-title">
                   <div class="s"></div>
                   <div class="news">最新内容</div>
               </div>
               <div class="more-content">
                   <div class="more" @click="moreContent">查看更多</div>
                   <div class="more-icon">
                       <van-icon name="more-o" size="18px" color="#a8a7a7"/>
                   </div>
               </div>
         </div>
        </van-sticky>
     </div> 
   </div>
     <div slot="content">
       <content-item></content-item>
     </div>
  </base-layout>
</template>

<script>
import ContentItem from './contentItem.vue'
import {Toast} from 'vant';
export default {
    components: { ContentItem },
    data(){
       return {
           createTheme: '',
           writeContent: '',
           textContent: true,
           audioContent: true,
           videoContent: true,
           avater: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2967487759,252864316&fm=26&gp=0.jpg',
       swiperList: [
           {id: 1, imgSrc: 'https://i.loli.net/2019/11/07/hAv6EFfGCSOeDRI.jpg'},
           {id: 2, imgSrc: 'https://i.loli.net/2019/11/07/tP3SgWAr7iBlZOx.jpg'},
           {id: 3, imgSrc: 'https://i.loli.net/2019/11/07/xAlTiQkmIL4doyH.jpg'},
       ],
       menuList: [
           { icon: 'https://i.loli.net/2019/11/08/3fL1Q68g5zoEsV9.png', text: '广场'},
           { icon: 'https://i.loli.net/2019/11/08/3liqY7uwNDPJKhd.png', text: '创主题'},
           { icon: 'https://i.loli.net/2019/11/08/MPGuNnFwp936Jai.png', text: '写内容'},
           { icon: 'https://i.loli.net/2019/11/08/2E4SI35dLeprmza.png', text: '功能待定'},
       ],
     }
   },
   methods: {
       toSearch(){
           this.$router.push('/search')
       },
       moreContent() {
          this.$router.push('/content') 
       },
       iconGo(item) {
           if(item.text === '创主题') {
               this.$router.push('/theme')
           }
           if(item.text === '广场') {
               this.$router.push('/content')
           }
           if(item.text === '写内容') {
               this.$router.push('/writeContent')
           }
       }
   }
}
</script>

<style lang="scss" scoped>
.f5{
    width: 100%;
    height: 5px;
    background-color: #f5f5f5;
}
.header{
    background-color: #f5f5f5;
    .bg_index{
     margin-bottom: -4px;
     img{
         width: 100%;
         height: 150px;
     }
 }
 .menu{
      .menu-title{
          margin-top: 5px;
      }
 }
}
.new-content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #ffffff;
    border-bottom: 1px solid #f5f5f5;
    .content-title{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    .s{
        width: 5px;
        height: 25px;
        background-color: #12C3DF;  
        border-radius: 5px;
        margin: 5px 10px;
    }
    .news{
        font-size: 16px;
    } 
 }
 .more-content{
     display: flex;
     flex-direction: row;
     align-items: center;
     margin-right: 10px;
     .more{
          color: #a8a7a7;
          margin-right: 5px;
     }
     .more-icon{
         margin-top: 5px;
     }
 }   
}


</style>