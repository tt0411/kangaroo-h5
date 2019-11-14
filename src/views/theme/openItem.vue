<template>
  <div class="container">
        <div class="box">
          <div class="itemList" v-for="(item, index) in themeList" :key="index" @click="toContent(item)">
                   <div class="item">
                       <div class="top">
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
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            themeList: []
        }
    },
    computed: {
        ...mapState(['theme'])
    },
    mounted() {
        this.themeList = this.theme.openTheme;
        // this.$store.dispatch('theme/fetchOpenTheme').then(rsp =>{
        //     if(rsp.code === 200) {
        //         this.themeList = rsp.data
        //     }
        // })
    },
    methods: {
        toContent(item) {
            this.$router.push({ path: '/themeTocontent', query: { id: item.id, name: item.name } });
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
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: nowrap;
            .name{
                font-size: 18px;
                color: #ffffff;
               
            }
            .status {
                color: #ffffff;
                font-size: 14px;
                margin-top: 5px;
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