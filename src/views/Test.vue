<template> 
<div>
 <header-nav/>
 <div class="container">
    <div class="user" v-for="(item, index) in userList" :key="index">
      <div class="name">姓名：{{item.sname}}</div>
      <div class="age">年龄：{{item.sage}}岁</div>
      <div class="tel">手机：{{item.tel}}</div>
      <div class="addr">地址：{{item.addr}}</div>
    </div>
</div>
</div>
</template>

<script>
import { getAllInfo } from '../api/test'
export default {
  data(){
    return{
        userList:[]
    }
  },
  created(){
    this.getInfo()
  },
  methods:{
    async getInfo(){
      const rsp = await getAllInfo()
      this.userList = rsp.data
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    .user{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      border-bottom: 1px solid #eeeeee;
      padding:10px;
    
    }
  }
</style>