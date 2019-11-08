<template>
  <common-layout>
      <div slot="top">
           <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
                @search="onSearch"
                >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
      </div>
      <div slot="content">
          <div class="nothing">
                 <Empty :type="4"/>
          </div>
      </div>
  </common-layout>
</template>

<script>
import {Toast} from 'vant'
import Empty from '../../components/empty'
export default {
    components: { Empty },
    data() {
        return {
            value: '',
            type: null,
            searchList: []
        }
    },
    created() {
        if(this.$route.query.value && this.$route.query.type) {
            this.value = this.$route.query.value
            this.type = this.$route.query.type
        }
        console.log(this.value, this.type)
    },
    methods: {
        onSearch() {
            if(!this.value){
                Toast('请输入搜索关键词')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.nothing{
    margin-top: 10%;
}
</style>