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
                    >

                    </van-list> -->
                    
                </div>
            </van-tab>
            <van-tab>
                <div slot="title">
                    <van-icon name="chat-o" size="20px"/>
                    {{content.comment}}
                </div>
                <div class="commentList">
                    评论列表
                </div>
            </van-tab>
            <van-tab>
                <div slot="title">
                    <van-icon name="like-o" size="20px"/> 
                {{content.mark}}
                </div>
                <div class="markList">
                    点赞列表
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
}
</style>