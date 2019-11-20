<template>
  <div>
    <div class="img" v-if="type === 1">
        <img :src="empty[0]"/>
        <div class="text">暂无消息</div>
    </div>
     <div class="img" v-if="type === 2">
        <img :src="empty[1]"/>
        <div class="text">暂无收藏</div>
    </div>
     <div class="img" v-if="type === 3">
        <img :src="empty[2]"/>
        <div class="text">暂无主题</div>
    </div>
    <div class="img" v-if="type === 4">
        <img :src="empty[3]"/>
        <div class="text">暂无内容</div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['type'],
    data() {
        return {
            empty: [
                'https://i.loli.net/2019/11/07/QoxGHMvq5ZdLTXn.png',
                'https://i.loli.net/2019/11/07/gE4eZNaPVkqwcKi.png', 
                'https://i.loli.net/2019/11/07/IzRsylA7oe2UCjE.png', 
                'https://i.loli.net/2019/11/08/4F5i1MXdWgUSxet.png'
                ]
        }
    }
}
</script>

<style lang="scss" scoped>

    .img{ 
        text-align: center;
     img{
        width: 60%;
     }
     .text{
         font-size: 16px;
         color: #696464;
     }
}

</style>