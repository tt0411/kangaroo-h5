<template>
 <van-sticky>
   <div class="content-options">
            <van-tabs v-model="active"  sticky animated swipeable color="#12C3DF">
            <van-tab>
                <div slot="title">
                    <van-icon name="star-o" size="20px" /> 
                    {{content.save}}
                </div>
                <div class="saveList">
                   <!-- <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    ></van-list> -->
                    <div class="saveItem" v-for="(item, index) in saveList" :key="index">
                        <van-row gutter="5">
                        <van-col span="3">
                            <div class="avatar">
                                <van-image round width="30px" height="30px" :src="item.imgUrl"/>
                            </div>
                        </van-col>
                        <van-col span="5">
                           <div class="name">{{item.nickName}}</div>
                        </van-col>
                        <van-col span="16">
                            <div class="time">{{item.time}} 收藏了该内容</div>
                        </van-col>
                     </van-row>
                    </div>
                   <div class="noMore">已经到底了 ~_~</div>
                </div>
            </van-tab>
            <van-tab>
                <div slot="title">
                    <van-icon name="chat-o" size="20px"/>
                    {{content.comment}}
                </div>
                <div class="commentList">
                   <div class="commentItem" v-for="(item, index) in commentList" :key="index">
                       <van-row gutter="5">
                            <van-col span="3">
                                <div class="avatar">
                                     <van-image round width="30px" height="30px" :src="item.imgUrl"/>
                                </div>
                            </van-col>
                            <van-col span="21">
                                <div class="right">
                                    <div class="name">{{item.nickName}}</div>
                                    <div class="comment">
                                        {{item.comment}}
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                        <div class="time">
                          评论时间：  {{item.time}}
                        </div>
                   </div>
                   <div class="noMore">已经到底了 ~_~</div>
                </div>
            </van-tab>
            <van-tab>
                <div slot="title">
                    <van-icon name="like-o" size="20px"/> 
                {{content.mark}}
                </div>
                <div class="markList">
                     <div class="markItem" v-for="(item, index) in markList" :key="index">
                        <van-row gutter="5">
                        <van-col span="3">
                            <div class="avatar">
                                <van-image round width="30px" height="30px" :src="item.imgUrl"/>
                            </div>
                        </van-col>
                        <van-col span="5">
                           <div class="name">{{item.nickName}}</div>
                        </van-col>
                        <van-col span="16">
                            <div class="time">{{item.time}} 点赞了该内容</div>
                        </van-col>
                     </van-row>
                    </div>
                    <div class="noMore">已经到底了 ~_~</div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</van-sticky>
</template>

<script>
export default {
  props: ['content'],
  data(){
      return{
           active: 1,
           loading: false,
           finished: false,
           saveList: [
               {id: 1, nickName: '张三丰', time: '2019-10-30 13:15:09', imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1820523987,3798556096&fm=26&gp=0.jpg'},
               {id: 2, nickName: '李世民', time: '2019-10-31 13:15:09', imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=320178652,790985626&fm=26&gp=0.jpg'},
               {id: 3, nickName: '李怼怼', time: '2019-10-31 15:13:18', imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
           ],
           markList: [
                {id: 1, nickName: '张三丰', time: '2019-10-30 13:15:09', imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1820523987,3798556096&fm=26&gp=0.jpg'},
                {id: 2, nickName: '李世民', time: '2019-10-31 13:15:09', imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=320178652,790985626&fm=26&gp=0.jpg'},
           ],
           commentList: [
              {id: 1, nickName: '张三丰', time: '2019-10-30 13:15:09', imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1820523987,3798556096&fm=26&gp=0.jpg', comment: '这是一条有趣的评论！这是一条有趣的评论！这是一条有趣的评论！这是一条有趣的评论！这是一条有趣的评论！'},
               {id: 2, nickName: '李世民', time: '2019-10-31 13:15:09', imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=320178652,790985626&fm=26&gp=0.jpg', comment: '这是一条有趣的评论！这是一条有趣的评论！这是一条有趣的评论！这是一条有趣的评论！这是一条有趣的评论！'},
               {id: 3, nickName: '李怼怼', time: '2019-10-31 15:13:18', imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg', comment: '这是一条有趣的评论！这是一条有趣的评论！这是一条有趣的评论！这是一条有趣的评论！这是一条有趣的评论！'},
           ]
      }
  },
  methods: {
      onLoad(){

      }
  }
}
</script>

<style lang="scss" scoped>
 .content-options{
    width: 100%;
    .noMore{
        text-align: center;
        margin: 10px 0;
        color: #4b4b4b;
    }
    .saveList{
        margin: 15px 10px;
        .saveItem{
            border-bottom: 1px solid #f5f5f5;
            padding: 5px;
            .name{
                line-height: 30px;
            }
            .time{
                line-height: 30px;
                color: #979494;
                font-size: 12px;
            }
        }
    }
    .markList{
        margin: 15px 10px;
         .markItem{
            border-bottom: 1px solid #f5f5f5;
            padding: 5px;
            .name{
                line-height: 30px;
            }
            .time{
                line-height: 30px;
                color: #979494;
                font-size: 12px;
            }
        }
    }
    .commentList{
        margin: 15px 10px;
        .commentItem{
            border-bottom: 1px solid #f5f5f5;
            padding: 5px;
            .right{
                margin-bottom: 10px;
                .name{
                    margin-bottom: 5px;
                    color:#585656;
                    font-size: 14px;
                }
            }
            .time{
                color: #979494;
                font-size: 12px;
            }
        }
    }
}
</style>