<template>
  <common-layout>
      <div slot="content">
          <div class="container">
           <div class="search">
           <div class="typeList">
           <van-dropdown-menu active-color="#12C3DF" style="border: none;">
                <van-dropdown-item v-model="value" :options="typeList" @change="pickedType" style="border: none;" />
            </van-dropdown-menu>
           </div>
           <div class="searchInput">
            <van-search
                v-model="searchValue"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
                @search="onSearch"
                >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            </div>
           </div>
           <div class="searchHistory" v-if="localHistory.length > 0">
               <div class="historyName">
                   <div class="title">历史搜索</div>
                   <div class="del">
                       <van-icon name="delete" @click="deleteHistory"/>
                   </div>
               </div>
               <div class="historyList">
                    <van-tag color="#f2826a" style="margin: 3px;" size="medium" v-for="(item, index) in localHistory" :key="index" @click="pickTag(item)">{{item}}</van-tag>
               </div>
           </div>
          </div>
      </div>
  </common-layout>
</template>

<script>
import {Toast} from 'vant' 
export default {
    data() {
        return {
            value: 1,
            searchValue: '',
            typeList: [
                { text: '搜用户', value: 1},
                { text: '搜作品', value: 2},
                { text: '搜主题', value: 3},
            ],
            historyList: [],
            localHistory: [],
        }
    },
    created() {
        if(this.$route.query.type) {
            this.value = this.$route.query.type
        }
    },
    mounted() {
         if (localStorage.getItem('historySearchList')) {
            let list = localStorage.getItem('historySearchList').split(',')
            this.localHistory = [... new Set(list)]
       }
    },
    methods: {
        onSearch() {
            if(this.searchValue === ''){
                Toast('请输入搜索关键词')
            }else{
                this.historyList.push(this.searchValue)
                localStorage.setItem('historySearchList', this.historyList)
                let list = localStorage.getItem('historySearchList').split(',')
                this.localHistory = [... new Set(list)]
                console.log(this.value) 
            }
           
        },
        pickedType(value) {
            this.value = value
        },
        deleteHistory() {
            localStorage.removeItem('historySearchList')
            this.localHistory = []
        },
        pickTag(item){
            this.searchValue = item
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        .search{
            display: flex;
            flex-direction: row;
            align-items: center;
            .typeList{
                flex: 1;
                border: none;
            }
            .searchInput{
                flex: 5
            }
        }
        .searchHistory{
            margin: 20px;
            width: 90%;
            margin-left: 5%;
            .historyName{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              .title{
                font-size: 14px;
                
             }
            }
            .historyList{
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                margin-top: 10px;
            }
        }
    }
</style>