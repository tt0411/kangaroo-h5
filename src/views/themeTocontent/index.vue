<template>
  <common-layout>
      <div slot="top">
          <div class="card">
                 <div class="item"> 
                    <van-row gutter="5">
                      <van-col span="16">
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
                         <van-col span="2">
                            <div class="edit" v-if="isEdit" @click="toEdit">
                                <van-icon name="edit" color="#fff" size="20px" />
                            </div>
                        </van-col>
                       </van-row>
                 </div>
          </div>  
            <van-dialog v-model="showBox" title="修改主题" show-cancel-button  :beforeClose="beforeClose" confirm-button-color="#12C3DF">
                <div class="theme">
                    <van-field v-model="themeName"  label="主题名称"  maxlength="10" class="input" clearable required :error-message="nameError"/>
                </div>
            </van-dialog>
      </div>
      <div slot="content">
          <ContentItem :more="false"/>
      </div>
     
  </common-layout>
</template>

<script>
import ContentItem from '../index/contentItem'
import {Toast} from 'vant'
export default {
    components: { ContentItem },
    data() {
        return {
            id: null,
            name: '',
            imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2967487759,252864316&fm=26&gp=0.jpg', 
            time: '2019-11-07 11:38:12',
            nickName: '李喋喋',
            nameError: '',
            showBox: false,
            themeName: '',
            isEdit: false,
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.name = this.$route.query.name;
        if(this.$route.query.isEdit) {
            this.isEdit = this.$route.query.isEdit;
        }
        document.title = '主题内容页'
    },
    mounted() {
        if(this.id) {
            this.$store.dispatch('theme/getThemeById', this.id).then(rsp => {
                if(rsp.code === 200) {
                    this.themeName = rsp.data.name
                    this.imgUrl = rsp.data.imgUrl
                    this.nickName = rsp.data.nickName
                    this.time = rsp.data.create_time
                }
            })
        }
    },
    methods: {
        toEdit() {
            this.showBox = true;
        },
        beforeClose(action, done) {
        if(action === 'confirm') {
        if(!this.themeName) {
            this.nameError = '主题名称不能为空'
            done(false)
        }else{
            let params = {
                name: this.themeName,
                id: this.id
            }
            this.$store.dispatch('theme/updateTheme', params).then(rsp => {
            if(rsp.code === 200) {
                Toast.success(rsp.msg);
                this.name = this.themeName;
                setTimeout(done)
            }
          })
        }    
        } else if(action === 'cancel') {
            done()
        }
      }
    },
    watch: {
     themeName(newVal, oldVal) {
      if(newVal){
        this.nameError = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped> 
    .card {
      .item{
         background-image: linear-gradient( 135deg, #ABDCFF 10%, #12C3DF 100%);
       // background-color: #12C3DF;
        display: flex;
        flex-direction: column;
        padding: 5px 10px;
        box-shadow: 0 1px 1px 1px;
        .top{
            margin-bottom: 10px;
            .name{
                font-size: 20px;
                color: #ffffff;
            }
        }
        .bottom{
            display: flex;
            flex-direction: column;
            .user{
                color: #fff;
                display: flex;
                flex-direction: row;
                align-items: center;
                .userName{
                    margin-left: 10px;
                    font-size: 16px;
                }
            }
            .time{
                margin-top: 5px;
                color: #fff;
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
                color: #fff;
                font-size: 18px;
            }
            .count{
                margin-top: 10px;
                color: #fff;
                font-size: 24px;
            }
        }
    }
}

</style>