<template>
<common-layout>
    <div solt="top"></div>
      <div slot="content">
          <Detail/>
      </div>
         <div slot="footer">
            <Footer/>
         </div>
    </common-layout>
</template>

<script>
import Detail from './detail.vue'
import Footer from './footer.vue'
export default {
    components: { Detail, Footer },
}
</script>
