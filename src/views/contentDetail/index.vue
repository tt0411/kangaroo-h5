<template>
<common-layout>
    <div solt="top"></div>
      <div slot="content">
          <Detail />
      </div>
         <div slot="footer">
            <Footer :disabled="false"/>
         </div>
    </common-layout>
</template>

<script>
import Detail from './detail.vue'
import Footer from './footer.vue'
export default {
    components: { Detail, Footer },
    data() {
        return {
            data: [],
            id: null
        }
    },
    created() {
        if(this.$route.query.id) {
            this.id = this.$route.query.id
        }
        this.changeContentId();
    },
    methods: {
        changeContentId() {
           this.$store.commit('content/changeContentId', this.id)
        }
    }
}
</script>
