<template>
  <div class="container">
      <div v-if="themeList.length > 0">
        <div class="box">
             <div class="itemList" v-for="(item, index) in themeList" :key="index" @click="toContent(item)">
                   <div class="item">
                       <div class="top">
                            <div class="status" v-if="item.status === 1 && item.flag === 0"><van-tag mark type="warning">待审核</van-tag></div>
                            <div class="status" v-if="item.status === 0"><van-tag mark type="primary">不公开</van-tag></div>
                            <div class="status" v-if="item.status === 1 && item.flag === 1"><van-tag mark type="success">审核通过</van-tag></div>
                            <div class="status" v-if="item.status === 1 && item.flag === 2"><van-tag mark>审核不通过</van-tag></div>
                            
                           <div class="name">{{item.name}}</div>
                       </div>
                       <div class="bottom">
                           <div class="user">
                               <div class="avatar">
                                   <van-image width="30" height="30" :round="true" fit="cover" :src="item.imgUrl" />
                               </div>
                               <div class="userName">{{item.nickName}}</div>
                           </div>
                           <div class="time">创建于: {{item.create_time}}</div>
                       </div>
                </div>
           </div>
          </div>
         </div> 
         <div v-else>
             <Empty :type="3"/>
         </div>
  </div>
</template>

<script>
import Empty from '../../components/empty'
import { mapState } from 'vuex'
export default {
    components: { Empty },
    data() {
        return {
            themeList: []
        }
    },
    computed: {
        ...mapState(['theme'])
    },
    created() {
      this.themeList = this.theme.userTheme
    },
    methods: {
        toContent(item) {
            if(item.status === 0 || (item.status === 1 && item.flag === 1)) {
               this.$router.push({ path: '/themeTocontent', query: { id: item.id, name: item.name,isEdit: true } }); 
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
      margin: 15px 5px;
     .box{
      column-count: 2;
      width: 100%;
      column-gap: 10px;
      column-width: 50%;
    .itemList{
        background-image: linear-gradient( 135deg, #ABDCFF 10%, #12C3DF 100%);
        display: flex;
        flex-direction: column;
        padding: 5px 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        break-inside: avoid;
        .top{
            margin-bottom: 10px;
            .name{
                font-size: 18px;
                color: #ffffff;
            }
            .status {
                color: #ffffff;
                margin-left: -10px;
                margin-top: -5px;
               
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
    
}
</style>