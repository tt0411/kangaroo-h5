<template>
   <div class="content-options">
         <van-tabs v-model="active"  animated color="#12C3DF" swipeable>
            <van-tab>
                <div slot="title">
                    <van-icon name="star-o" size="20px" /> 
                    {{saveCount}}
                </div>
                 <van-pull-refresh v-model="isSaveLoading" @refresh="onSaveRefresh">
                <div class="saveList" v-if="saveList.length > 0">
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
                  </van-pull-refresh>
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
                <van-pull-refresh v-model="isCommentLoading" @refresh="onCommentRefresh">
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
                                    <div class="sign">
                                        <div class="name">
                                           {{item.nickName}}  
                                        </div>
                                        <div style="margin-top: -6px;">
                                        <van-tag type="danger"  v-if="item.uid == uid">作者</van-tag>
                                        </div>
                                        </div>
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
                </van-pull-refresh>
            </van-tab>
           
           
            <van-tab>
                <div slot="title">
                    <van-icon name="like-o" size="20px"/> 
                {{markCount}}
                </div>
                 <van-pull-refresh v-model="isMarkLoading" @refresh="onMarkRefresh">
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
                 </van-pull-refresh>
            </van-tab>
           
        </van-tabs>
    </div>
</template>

<script>
import Empty from '../../components/empty'
import {mapState} from 'vuex'
export default {
  components: { Empty },
  data(){
      return{
           active: 1,
           saveList: [],
           markList: [],
           commentList: [],
           is_comment: false, // false 开启评论 true 关闭评论
           saveCount: 0,
           markCount: 0,
           commentCount: 0,
           uid: null,
           isSaveLoading: false,
           isMarkLoading: false,
           isCommentLoading: false,
           id: null,
      }
  },
  computed: {
      ...mapState(['content'])
  },
  created() {
        this.id = this.content.content_id;
  },
  mounted() {
     this.$store.dispatch('content/getCommentById', this.id).then(rsp => {
            if(rsp.code === 200) {
               this.commentList = rsp.list;
               this.commentCount = rsp.count;  
               this.isCommentLoading = false;
            }
        })
        this.$store.dispatch('content/getSaveById', this.id).then(rsp => {
            if(rsp.code === 200) {  
                this.saveList = rsp.list;
                this.saveCount = rsp.count;
                this.isSaveLoading = false;
            }
        })
        this.$store.dispatch('content/getMarkById', this.id).then(rsp => {
            if(rsp.code === 200) {
                this.markList = rsp.list;
                this.markCount = rsp.count;
                this.isMarkLoading = false;
            }
        })

 },
  methods: { 
      toHomePage(item) {
         // this.$router.push({ path: '/homePage', query: { id: item.uid }})
      },
      onSaveRefresh() {
          this.$store.dispatch('content/getSaveById', this.content.content_id).then(rsp => {
              this.$store.dispatch('content/markSign', this.content.content_id)
              this.$store.dispatch('content/saveSign', this.content.content_id)
              if(rsp.code === 200) {
                  this.saveList = rsp.list;
                  this.saveCount = rsp.count;
                  this.isSaveLoading = false;
              }
          })
      },
      onMarkRefresh() {
          this.$store.dispatch('content/getMarkById',this.content.content_id).then(rsp => {
               this.$store.dispatch('content/markSign', this.content.content_id)
               this.$store.dispatch('content/saveSign', this.content.content_id)
              if(rsp.code === 200) {
                  this.markList = rsp.list;
                  this.markCount = rsp.count;
                  this.isMarkLoading = false;
              }
          })
      },
      onCommentRefresh() {
          this.$store.dispatch('content/getCommentById',this.content.content_id).then(rsp => {
              this.$store.dispatch('content/markSign', this.content.content_id)
              this.$store.dispatch('content/saveSign', this.content.content_id)
              if(rsp.code === 200) {
                  this.commentList = rsp.list;
                  this.commentCount = rsp.count;
                  this.isCommentLoading = false;
              }
          })
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
                .sign{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .name{
                    margin-bottom: 5px;
                    color:#585656;
                    font-size: 15px;
                    margin-right: 10px;
                 }
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