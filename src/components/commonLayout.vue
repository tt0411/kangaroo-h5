<template>
      <div id="container" ref='container'>
          <div class="header">
              <header-nav/>
              <slot name='top'></slot>
          </div>
          <div class="content">
              <slot name='content'></slot>
          </div>
          <div class="footer">
            <slot name='footer'></slot>
          </div>
      </div>

</template>

<script>
import HeaderNav from "./headerNav.vue";
export default {
  components: { HeaderNav },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
    #container{
        background: #ffffff;
        height: 100vh;
        font-size:  0.16rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .content {
            flex: 1;
            overflow: auto;
        }
    }
</style>