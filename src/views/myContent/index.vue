<template>
  <base-layout>
      <div slot="content">
          <div class="container">
            <van-tabs v-model="active" sticky color="#12C3DF">
            <van-tab title="待审核">
                <Empty :type="4"/>
            </van-tab>
            <van-tab title="审核通过">
                <Empty :type="4"/>
            </van-tab>
            <van-tab title="审核不通过">
                <Empty :type="4"/>
            </van-tab>
             <van-tab title="不公开">
                <Empty :type="4"/>
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
        return {
            active: 0
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
  background-color: #f5f5f5;
  height: calc(100vh - 96px);
}
</style>