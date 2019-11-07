<template>
  <div class="container">
        <van-row gutter="5">
            <div class="itemList" v-for="(item, index) in themeList" :key="index">
              <van-col span="12">
                   <div class="item">
                       <div class="top">
                           <div class="name">{{item.name}}</div>
                       </div>
                       <div class="bottom">
                           <div class="user">
                               <div class="avatar">
                                   <van-image width="30" height="30" :round="true" fit="cover" :src="item.imgSrc" />
                               </div>
                               <div class="userName">{{item.nickName}}</div>
                           </div>
                           <div class="time">创建于: {{item.time}}</div>
                       </div>
                   </div>
              </van-col>
         </div>
        </van-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            themeList:[
              {id: 1, name: '十八岁的天空', nickName: '李喋喋', imgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2967487759,252864316&fm=26&gp=0.jpg', time: '2019-11-07 11:38:12'},
              {id: 2, name: '2019加油！', nickName: '李喋喋', imgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2967487759,252864316&fm=26&gp=0.jpg', time: '2019-11-07 11:38:12'},
              {id: 3, name: '工作的那些事儿', nickName: '李喋喋', imgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2967487759,252864316&fm=26&gp=0.jpg', time: '2019-11-07 11:38:12'},
              {id: 4, name: '少年，你今天努力了吗？', nickName: '李喋喋', imgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2967487759,252864316&fm=26&gp=0.jpg', time: '2019-11-07 11:38:12'},
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    margin: 15px 5px;
    .item{
        // background-image: linear-gradient( 135deg, #ABDCFF 10%, #12C3DF 100%);
        background-image: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%);
        display: flex;
        flex-direction: column;
        padding: 5px 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        .top{
            margin-bottom: 10px;
            .name{
                font-size: 18px;
                color: #ffffff;
            }
        }
        .bottom{
            display: flex;
            flex-direction: column;
            .user{
                color: #666363;
                display: flex;
                flex-direction: row;
                align-items: center;
                .userName{
                    margin-left: 5px;
                    font-size: 16px;
                }
            }
            .time{
                margin-top: 5px;
                color: #666464;
                font-size: 10px;
            }
        }
    }
}
</style>