<template>
   <div class="content-options">
         <van-tabs v-model="active"  animated color="#12C3DF" swipeable>
            <van-tab>
                <div slot="title">
                    <van-icon name="star-o" size="20px" /> 
                    {{saveCount}}
                </div>
                <div class="saveList" v-if="saveList.length > 0">
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
                                <van-image round width="30px" height="30px" :src="item.imgUrl"  @click="toHomePage(item)"/>
                            </div>
                        </van-col>
                        <van-col span="5">
                           <div class="name">{{item.nickName}}</div>
                        </van-col>
                        <van-col span="16">
                            <div class="time">{{item.create_time}} 收藏了该内容</div>
                        </van-col>
                     </van-row>
                    </div>
                </div>
                <Empty :type="2" v-else/>
            </van-tab>
            <van-tab>
                <div slot="title" v-if="!is_comment">
                    <van-icon name="chat-o" size="20px"/>
                    {{commentCount}}
                </div>
                 <div slot="title" v-else>
                    <van-icon name="chat-o" size="20px"/>
                    0
                </div>
                <div class="commentList" v-if="commentList.length > 0 && !is_comment">
                   <div class="commentItem" v-for="(item, index) in commentList" :key="index">
                       <van-row gutter="5">
                            <van-col span="3">
                                <div class="avatar">
                                     <van-image round width="30px" height="30px" :src="item.imgUrl"  @click="toHomePage(item)"/>
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
                          评论时间：  {{item.create_time}}
                        </div>
                   </div>
                </div>
                <Empty :type="5" v-if="commentList.length == 0 && !is_comment"/>
                <Empty :type="6" v-if="is_comment"/>
            </van-tab>
            <van-tab>
                <div slot="title">
                    <van-icon name="like-o" size="20px"/> 
                {{markCount}}
                </div>
                <div class="markList" v-if="markList.length > 0">
                     <div class="markItem" v-for="(item, index) in markList" :key="index">
                        <van-row gutter="5">
                        <van-col span="3">
                            <div class="avatar">
                                <van-image round width="30px" height="30px" :src="item.imgUrl"  @click="toHomePage(item)"/>
                            </div>
                        </van-col>
                        <van-col span="5">
                           <div class="name">{{item.nickName}}</div>
                        </van-col>
                        <van-col span="16">
                            <div class="time">{{item.create_time}} 点赞了该内容</div>
                        </van-col>
                     </van-row>
                    </div>
                </div>
                 <Empty :type="4" v-else/>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Empty from '../../components/empty'
import {mapState} from 'vuex'
export default {
  props: ['saveCount', 'markCount', 'commentCount'],
  components: { Empty },
  data(){
      return{
           active: 1,
           loading: false,
           finished: false,
           saveList: [],
           markList: [],
           commentList: [],
           is_comment: false,
      }
  },
  computed: {
      ...mapState(['content'])
  },
 
  mounted() {
      this.commentList = this.content.commentList
      this.markList = this.content.markList
      this.saveList = this.content.saveList
 },
  methods: { 
      toHomePage(item) {
          this.$router.push({ path: '/homePage', query: { id: item.uid }})
      }
  }
}
</script>

<style lang="scss" scoped>
 .content-options{
    width: 100%;
    font-size: 0.15rem;
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
             display: flex;
                flex-direction: row;
                justify-content: flex-end;
                color: #979494;
                font-size: 12px;
            }
        }
    }
}
</style>