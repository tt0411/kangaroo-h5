<template>
  <base-layout>
  <div slot="top">
    <van-search  placeholder="请输入搜索关键词" shape="round" @focus="toSearch"/>
  </div>
  <div slot="content">
    <div class="container">
       <div class="bg_index" @click="createTheme">
         <img :src="imgSrc" />
        </div>
          <van-tabs v-model="active" animated color="#12C3DF" @click="onClickTab">
          <van-tab title="公开主题">
            <OpenItem />
          </van-tab>
          <van-tab title="我的主题">
            <MyItem />
          </van-tab>
      </van-tabs>
     </div>
       <van-dialog v-model="showBox" title="创建主题" show-cancel-button  :beforeClose="beforeClose" confirm-button-color="#12C3DF">
        <div class="theme">
             <van-field v-model="themeName"  label="主题名称" placeholder="请输入主题名称" maxlength="10" class="input" clearable required :error-message="nameError"/>
             <div class="isOpen">
               <div class="name">是否公开</div>
               <div class="switch"><van-switch v-model="isOpen" active-color="#12C3DF" size="24px"/></div>
             </div>
             <div class="tips" v-if="isOpen">
             <div>
             <van-icon name="warning" color="#12C3DF"/>
             </div> 
             <div style="margin-top: -2px;">
               <span class="tips-content">主题公开审核通过后，所有人可见，其主题下的所有内容也将默认所有人可见</span>
             </div>
         </div>
        </div>
    </van-dialog>

      <van-dialog v-model="show" title="提示" show-cancel-button confirmButtonColor="#12C3DF" confirmButtonText="去登录" @confirm="toLogin">
         <div class="loginDialog">登录后才能创建主题哟 ~_~</div>
        </van-dialog>
    </div>
  </base-layout>
</template>

<script>
import {Toast} from 'vant'
import OpenItem from './openItem.vue'
import MyItem from './myItem.vue'
export default {
  components: { OpenItem, MyItem },
    data() {
        return {
          showBox: false,
          active: 0,
          imgSrc: 'https://i.loli.net/2019/11/07/VEPLA5j2NZSc4Wd.jpg',
          themeName: '',
          isOpen: false,
          nameError: '', 
          msg: '',
          show: false,
        }
    },
    created() {
      this.$store.dispatch('theme/fetchOpenTheme')
      this.$store.dispatch('theme/fetchUserTheme')
      if(this.$route.query.isWrite) {
        this.showBox = true
      }
     if(this.$route.query.active) {
       this.active = this.$route.query.active
     }
    },
    methods: {
      toSearch() {
        // 根据type类型去搜索页面切换类型
        this.$router.push({ path: '/search', query: {type: 3}})
      },
      toLogin() {
        this.$router.push('/login')
      },
      createTheme() {
         if(localStorage.getItem('token')) {
           this.showBox = true;
         }else{
           this.show = true;
         }
      },
      onClickTab(name, title) {
        if(title ==='我的主题') {
          this.$store.dispatch('theme/fetchUserTheme')
        }
        if(title === '公开主题') {
         this.$store.dispatch('theme/fetchOpenTheme')
        }
      },
     beforeClose(action, done) {
      if(action === 'confirm') {
       if(!this.themeName) {
         this.nameError = '主题名称不能为空'
         done(false)
       }else{
          let params = {
             name: this.themeName,
             status: this.isOpen ? 1 : 0
          }
         this.$store.dispatch('theme/createTheme', params).then(rsp => {
           if(rsp.code === 200) {
              this.msg = rsp.msg;
              Toast.success(this.msg);
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
 .bg_index{
     margin-bottom: -4px;
     text-align: center;
     img{
         width: 100%;
         height: 150px;
     }
 }
 .theme{
   padding-left: 10px;
   .input{
    font-size: 16px;
   }
   .isOpen{
     display: flex;
     flex-direction: row;
     align-items: center;
     padding: 10px 0;
     .name{
       margin-left: 15px;
     }
     .switch{
       margin-left: 30px;
     }
     
   }
   .tips{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px 0;
    .tips-content{
        color: #9c9a9a;
        margin-left: 5px;
        font-size: 14px;
    }
   }
 }
   .loginDialog{
    text-align: center;
    padding: 10px 0;
    color: #776d6d;
}
</style>