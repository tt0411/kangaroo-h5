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
    <div class="img" v-if="type === 5">
        <img :src="empty[0]"/>
        <div class="text">暂无评论，快来抢沙发了</div>
    </div>
     <div class="img" v-if="type === 6">
        <img :src="empty[4]" style="width: 60px; height: 60px;margin-top: 30px;"/>
        <div class="text">作者关闭了评论</div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        type: {
            type: Number,
            default: 1,
        }
    },
    data() {
        return {
            empty: [
                'https://i.loli.net/2019/11/07/QoxGHMvq5ZdLTXn.png',
                'https://i.loli.net/2019/11/07/gE4eZNaPVkqwcKi.png', 
                'https://i.loli.net/2019/11/07/IzRsylA7oe2UCjE.png', 
                'https://i.loli.net/2019/11/08/4F5i1MXdWgUSxet.png', 
                'https://i.loli.net/2019/11/27/WPizHm1yvClEZdX.png',
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

    .img{ 
        text-align: center;
     img{
        width: 50%;
     }
     .text{
         font-size: 16px;
         color: #696464;
     }
}

</style>