<template>
  <base-layout>
    <div slot="content">
      <div class="container">
        <van-tabs v-model="active" animated color="#12C3DF">
          <van-tab title="用户消息">
            <div class="nothing">
              <Empty :type="1"/>
            </div>
          </van-tab>
          <van-tab title="系统消息">
            <div class="nothing">
              <Empty :type="1"/>
             </div>
          </van-tab>
       </van-tabs>
      </div>
    </div>
  </base-layout>
</template>

<script>
import Empty from '../../components/empty'
export default {
   components: { Empty },
    data() {
      return{
        active: 0,
      }
    }
}
</script>

<style lang="scss" scoped>
.container{
  background-color: #f5f5f5;
  height: calc(100vh - 96px);
  .nothing{
    margin-top: 20%;
  }
}
</style>