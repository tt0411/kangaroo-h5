<template>
<common-layout>
    <div solt="top"> </div>
      <div slot="content">
            <Detail /> 
            <ListItem :saveCount="saveCount" :markCount="markCount" :commentCount="commentCount" />
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
            saveCount: 0,
            markCount: 0,
            commentCount: 0,
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
    mounted() {
        this.$store.dispatch('content/getContentById', this.content.content_id).then(rsp => {
         if(rsp.code === 200) {
         this.saveCount =rsp.data.save
         this.markCount = rsp.data.mark
         this.commentCount = rsp.data.comment
       }
    })
        
    },
    methods: {
       
    }
}
</script>
