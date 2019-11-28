<template>
<common-layout>
    <div solt="top"> </div>
      <div slot="content">
            <Detail /> 
            <ListItem />
      </div>
         <div slot="footer">
            <Footer />
         </div>
    </common-layout>
</template>

<script>
import Detail from './detail.vue'
import Footer from './footer.vue'
import ListItem from './listItem.vue'
import {mapState} from 'vuex'
export default {
    components: { Detail, Footer, ListItem },
    data() {
        return {
            data: [],
            id: null,
        }
    },
    computed: {
        ...mapState(['content'])
    },
    created() {
        if(this.$route.query.id) {
            this.id = this.$route.query.id 
            this.$store.commit('content/changeContentId', this.id)
        }
    },
    methods: {
       
    }
}
</script>
