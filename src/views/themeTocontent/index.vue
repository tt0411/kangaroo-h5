<template>
  <common-layout>
      <div slot="top">
          <div class="card">
                 <div class="item"> 
                    <van-row gutter="5">
                      <van-col span="18">
                       <div class="top">
                           <div class="name">{{name}}</div>
                       </div>
                       <div class="bottom">
                           <div class="user">
                               <div class="avatar">
                                   <van-image width="35" height="35" :round="true" fit="cover" :src="imgUrl" />
                               </div>
                               <div class="userName">{{nickName}}</div>
                           </div>
                           <div class="time">创建于: {{time}}</div>
                       </div> 
                       </van-col>
                        <van-col span="6">
                            <div class="contentCount">
                                <div class="content">内容量</div>
                                <div class="count">3</div>
                            </div>
                        </van-col>
                       </van-row>
                 </div>
          </div>
      </div>
      <div slot="content">
          <ContentItem :more="false"/>
      </div>
  </common-layout>
</template>

<script>
import ContentItem from '../index/contentItem'
export default {
    components: { ContentItem },
    data() {
        return {
            id: null,
            name: '',
            imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2967487759,252864316&fm=26&gp=0.jpg', 
            time: '2019-11-07 11:38:12',
            nickName: '李喋喋'
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.name = this.$route.query.name;
        document.title = this.name || '内容'
    },
}
</script>

<style lang="scss" scoped> 
    .card {
      .item{
        background-image: linear-gradient( 135deg, #ABDCFF 10%, #12C3DF 100%);
        display: flex;
        flex-direction: column;
        padding: 5px 10px;
        box-shadow: 0 1px;
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
                    margin-left: 10px;
                    font-size: 18px;
                }
            }
            .time{
                margin-top: 5px;
                color: #666464;
                font-size: 12px;
            }
        }
        .contentCount{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .content{
                margin-top: 20px;
                color: #646060;
                font-size: 18px;
            }
            .count{
                margin-top: 10px;
                color: #646060;
                font-size: 24px;
            }
        }
    }
}

</style>