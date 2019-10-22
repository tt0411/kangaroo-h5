<template>
  <div class="container">
    <header-nav :isBack="true" />
    <div class="content">
      <div>count值：{{this.count.count}}</div>
      <van-button type="info" @click="changeCount(10)">改变count值</van-button>
      <van-button type="warning" @click="goTest">go test页面</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const namespace = "count";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["count"])
  },
  methods: {
    changeCount(num) {
       this.$store.commit(`${namespace}/changeCount`, num);
    },
    goTest() {
      this.$router.push("test");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background: #f5f5f5;
  height: 100%;
  font-size: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
  }
}
</style>