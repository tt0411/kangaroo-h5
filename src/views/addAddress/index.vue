<template>
  <div class="box">
      <van-sticky>  <van-nav-bar
            title="选择位置"
            left-text="返回"
            right-text="确定"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
      <!-- <van-overlay :show="show" @click="show = false" /> -->
      <div id="container" style="width:100%; height:200px"></div>
      </van-sticky>
      <div class="centerList">
          <!-- <div class="listItem" v-for="(item, index) in addressList" :key="index" @click="pickedAddress(item)">
              <div class="name picked" v-if="item.isPicked">{{item.name}}</div>
              <div class="name" v-if="!item.isPicked">{{item.name}}</div>
               <div class="address picked" v-if="item.isPicked">{{item.address}}</div>
              <div class="address" v-if="!item.isPicked">{{item.address}}</div>
          </div> -->
          <van-radio-group v-model="radio">
            <van-cell-group>
                <van-cell :title="item.name" :label="item.address" clickable @click="checkedName(item, index)" v-for="(item, index) in addressList" :key="index">
                  <van-radio slot="right-icon" checked-color="#12C3DF" :name="index" />
                </van-cell>  
            </van-cell-group>
            </van-radio-group>
      </div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
import {Toast} from 'vant'
export default {
    data() {
       return{
           center: [106.532357,29.57212],
           show: false,
           addressList: [],
           pickAddress: '',
           pickedName: '',
           radio: '',
           toast1: null,
       }
    },
    mounted () {
     this.toast1 = Toast.loading({
         duration: 0, // 持续展示 toast
         forbidClick: true,
         message: '加载中...'
        });
        // this.show = true
        this.getLocation(); 
   },
  methods: {
    getLocation() {
     let mapObj = new AMap.Map('iCenter');
        mapObj.plugin('AMap.Geolocation', () => {
          let  geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            mapObj.addControl(geolocation);
            geolocation.isSupported();
            geolocation.getCurrentPosition((status, result) =>{
                 if(status == 'complete'){
                    this.center = [result.position.lng, result.position.lat];
                    this.init(); 
                    // this.show = false;
                    this.toast1.clear();
                    
                }
            });
        });
   },  
    init () {
        let map = new AMap.Map('container',{
            zoom: 14,            //缩放级别
            center: this.center,  //设置地图中心点
            resizeEnable: true,  //地图初始化加载定位到当前城市
        });
        let currentCenter = map.getCenter();//此方法是获取当前地图的中心点
        this.center = [currentCenter.lng,currentCenter.lat] 
        //根据地图中心点查附近地点，此方法在下方
         this.centerSearch();
        //监听地图移动事件，并在移动结束后获取地图中心点并更新地点列表
        let moveendFun = (e) => {
            // 获取地图中心点
            currentCenter = map.getCenter();
            this.center = [currentCenter.lng,currentCenter.lat]
            //根据地图中心点查附近地点
            this.centerSearch();
        }
        // 绑定事件移动地图事件
        map.on('moveend', moveendFun);
    },
  centerSearch(){
    AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({ 
            type: '汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息', // 兴趣点类别
            pageSize: 50, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: "全国", // 兴趣点城市
            autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        // let list = []
        this.addressList = []
        //根据地图中心点查附近地点
        placeSearch.searchNearBy('', [this.center[0],this.center[1]], 200, (status, result) => {
            if(status == 'complete'){
             this.addressList = result.poiList.pois;
             this.toast1.clear();
            //    list = result.poiList.pois
            //    list.forEach(item => {
            //       let addItem = Object.assign(item , {isPicked: false})
            //       this.addressList.push(addItem)
            //    })
              // console.log(this.addressList)
            }
        })
    })
   },
    onClickLeft() {
        this.$router.go(-1)
    },
    onClickRight() {
       if(!this.pickedAddress) {
           Toast('请选择位置')
       }else{
           this.$router.push({path: '/writeContent', query: { name: this.pickedName, address: this.pickedAddress}})
       }
    },
     checkedName(item, index){
         this.radio = index;
         this.pickedAddress = item.address;
         this.pickedName = item.name;
      },
    // pickedAddress(item) {
    //     item.isPicked = !item.isPicked
    //     if(item.isPicked){
    //         this.pickAddress = `${item.name}·${item.address}` 
    //     }else{
    //         this.pickAddress = ''
    //     } 
    //     console.log(this.pickAddress)
    // }
  }
}
</script>
<style lang="scss"scoped>
// 重置van-bar
.van-nav-bar {
  background: #12C3DF;
  .van-nav-bar__title {
    color: #ffffff;
  }
  .van-icon {
    color: #ffffff;
    font-size: 20px;
  }
  .van-nav-bar__text {
    color: #ffffff;
  }
}
.show{
    display: block
}
.noShow{
    display: none;
}
.centerList{
    .listItem{
        border-bottom: 1px solid #f5f5f5;
        margin-bottom: 5px;
        margin-left: 10px;
        .name{
            color: #504e4e;
            margin-bottom: 5px;
        }
        .address{
            color: #868585;
            font-size: 13px;
        }
        .picked{
            color: #12C3DF;
        }
    }
}
</style>