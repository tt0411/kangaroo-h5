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
      <div style="height: 5px;background-color: #f5f5f5;"></div>
    </div>
    <div slot="content">
      <div class="container">
        <div class="people" v-if="this.searchList.length > 0 && this.type === 1">
          <div class="peopleItem" v-for="index in 2" :key="index" @click="toHomePage">
            <div class="peopleLeft">
              <div class="avatar">
                <van-image
                  round
                  width="45px"
                  height="45px"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                ></van-image>
              </div>
              <div class="info">
                <div class="name">张三丰</div>
                <div class="count">
                  <div class="contentCount">作品 10</div>
                  <div class="themeCount">主题 3</div>
                </div>
              </div>
            </div>
            <div class="peopleRight">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="contents" v-if="this.searchList.length > 0 && this.type === 2">
           <ContentItem :more="false"/>
        </div>
        <div class="theme" v-if="this.searchList.length > 0 && this.type === 3">
          <div class="themeItem" @click="toThemeContent">
              <div class="themeLeft">
                  <div class="title">十八岁的天空</div>
                  <div class="info">
                      <div class="avatar">
                          <van-image
                            round
                            width="35px"
                            height="35px"
                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                            ></van-image> 
                      </div>
                      <div class="name">张三丰</div>
                  </div>
              </div>
              <div class="themeRight">
                  <div class="count">
                      <div class="name">内容量</div>
                      <div class="themeCount">3</div>
                  </div>
                  <div class="icon">
                        <van-icon name="arrow" color="#5f5d5d"/>
                  </div>
              </div>
          </div>
        </div>
        <div class="nothing" v-if="this.searchList.length === 0">
          <Empty :type="4" />
        </div>
      </div>
    </div>
  </common-layout>
</template>

<script>
import { Toast } from "vant";
import Empty from "../../components/empty";
import ContentItem from '../components/contentItem'
export default {
  components: { Empty, ContentItem },
  data() {
    return {
      value: "",
      type: null,
      searchList: [],
      titleObj: {
          1: '用户', 
          2: '作品',
          3: '主题'
      }
    };
  },
  created() {
    if (this.$route.query.value && this.$route.query.type) {
      this.value = this.$route.query.value;
      this.type = this.$route.query.type;
    }
    document.title =`搜索列表 - ${this.titleObj[this.type]}`
  },
  methods: {
    onSearch() {
      if (!this.value) {
        Toast("请输入搜索关键词");
      }
    },
    toHomePage() {
      // this.$router.push('/homePage')
    },
     toThemeContent() {
    this.$router.push('/themeTocontent')
   }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // height: calc(100vh - 145px);
  // background-color: #f5f5f5;
}
.nothing {
  margin-top: 10%;
}
.people {
  .peopleItem {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border-bottom: 1px solid #f5f5f5;
    .peopleLeft {
      display: flex;
      flex-direction: row;
      align-items: center;
      .avatar {
        margin-right: 20px;
      }
      .info {
        display: flex;
        flex-direction: column;
        .name {
          color: #424141;
          margin-bottom: 10px;
        }
        .count {
          display: flex;
          flex-direction: row;
          color: #727070;
          font-size: 14px;
          .contentCount {
            margin-right: 10px;
          }
        }
      }
    }
    .peopleRight {
        color: #5f5d5d;
    }
  }
}
.theme{
    .themeItem{ 
        padding: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #ffffff;
        border-bottom: 1px solid #f5f5f5;
        .themeLeft{
            display: flex;
            flex-direction: column;
            .title{
                color: #4d4b4b;
                font-size: 18px;
                margin-bottom: 10px;
            }
            .info{
                display: flex;
                flex-direction: row;
                align-items: center;
                .avatar{
                    margin-right: 10px;
                }
                .name{
                    color: #646161;
                }    
            }
        }
        .themeRight {
           display: flex;
           flex-direction: row;
           align-items: center;
           color: #5f5d5d;
           .count{
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               margin-right: 30px;
               .name{
                   margin-bottom: 10px;
               }
           }
       }
    }
}
</style>