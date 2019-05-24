<template>
  <div class="hello">
     <header id="header" class="mui-bar mui-bar-nav"  style="background: #2196f3;color: #fff">
      <h1 class="mui-title" style="color: #fff">业务库存查询</h1>
    </header>

    <div style="padding: 0 10px;margin-top: 48px;background: #fff">
      <div class="mui-content" style="background: #fff">
        <div class="mui-content-padded" style="margin: 0px;">
          <form class="mui-input-group">
            <div class="mui-input-row" style="position: relative;" id='spbm'>
              <label>商品编号</label>
              <input type="text" placeholder="请输入" v-model='name'>
               <i v-show='photos' class="fa fa-camera" style="position: absolute;right:3px;top: 25%;" @click='photo'></i>
            </div>
            <div class="mui-input-row">
              <label>生产厂家</label>
              <input type="text"  placeholder="请输入" v-model='factory'>
            </div>
            <div class="mui-input-row">
              <label>分公司</label>
                <select class="selct"  placeholder='请选择'   v-model='company'>  
                <option value="" selected >所有分公司</option> 
                <option  v-for="option,index in fgsbm" :key="index" :label="option.bmmc" :value="option.bm" >{{option.bmmc}}</option> 
           </select>
            </div>
            <div style="padding: 20px 0">
              <button type="button"  style="background:  #2196f3;color: #fff;width: 100%;font-size: 16px" @click='submit'>查询</button>&nbsp;&nbsp;
             <!--  <button type="button" class="mui-btn " onclick="return false;">取消</button> -->
            </div> 
          </form>
        </div>
      </div>  
  </div>

</div>

</template>

<script>
  import 'url-search-params-polyfill';
export default {
  name: 'home',
  data () {
    return {
      photos:'',
      name:'',
      company:'',
      factory:'',
      spbm:'',
       fgsbm: [{
          "bm": "01",
          "bmmc": "药品科"
        }, {
          "bm": "43",
          "bmmc": "药特分公司"
        }, {
          "bm": "03",
          "bmmc": "和平药房"
        }, {
          "bm": "04",
          "bmmc": "器械化玻分公司"
        }, {
          "bm": "05",
          "bmmc": "新药分公司"
        }, {
          "bm": "50",
          "bmmc": "渝医贸药品"
        }, {
          "bm": "15",
          "bmmc": "渝药销医药"
        }, {
          "bm": "10",
          "bmmc": "新产品开发分公司"
        }, {
          "bm": "11",
          "bmmc": "上海公司"
        }, {
          "bm": "12",
          "bmmc": "化学试剂分公司"
        }, {
          "bm": "16",
          "bmmc": "潼南医司"
        }, {
          "bm": "17",
          "bmmc": "北碚公司"
        }, {
          "bm": "18",
          "bmmc": "和平批发"
        }, {
          "bm": "19",
          "bmmc": "九龙坡分公司"
        }, {
          "bm": "20",
          "bmmc": "江北分公司"
        }, {
          "bm": "22",
          "bmmc": "和平新产品"
        }, {
          "bm": "24",
          "bmmc": "璧山县医司"
        }, {
          "bm": "25",
          "bmmc": "南川医司"
        }, {
          "bm": "27",
          "bmmc": "綦江医司"
        }, {
          "bm": "28",
          "bmmc": "科渝药品"
        }, {
          "bm": "29",
          "bmmc": "合川医司"
        }, {
          "bm": "30",
          "bmmc": "重药十堰公司"
        }, {
          "bm": "33",
          "bmmc": "西南生物新药公司"
        }, {
          "bm": "34",
          "bmmc": "渝药医药有限责任公司"
        }, {
          "bm": "37",
          "bmmc": "巴南区公司"
        }, {
          "bm": "82",
          "bmmc": "云南医药工"
        }, {
          "bm": "47",
          "bmmc": "贵州医司"
        }, {
          "bm": "58",
          "bmmc": "重药荣昌和平"
        }, {
          "bm": "65",
          "bmmc": "和平吉隆"
        }, {
          "bm": "69",
          "bmmc": "重药四川医药"
        }, {
          "bm": "70",
          "bmmc": "渝江津医药"
        }, {
          "bm": "94",
          "bmmc": "特殊药品分公司"
        }, {
          "bm": "97",
          "bmmc": "长寿医司"
        }, {
          "bm": "98",
          "bmmc": "合川医司ZB"
        }, {
          "bm": "99",
          "bmmc": "安岳医司"
        }, {
          "bm": "36",
          "bmmc": "垫江医司"
        }, {
          "bm": "96",
          "bmmc": "和平制药厂"
        }, {
          "bm": "26",
          "bmmc": "南充医司"
        }, {
          "bm": "35",
          "bmmc": "渝北公司"
        }, {
          "bm": "95",
          "bmmc": "和平物业公司"
        }, {
          "bm": "77",
          "bmmc": "渝和平苑方"
        }, {
          "bm": "00",
          "bmmc": "总公司(本部)"
        }, {
          "bm": "72",
          "bmmc": "贵州医药集团"
        }, {
          "bm": "71",
          "bmmc": "贵州遵义公司"
        }, {
          "bm": "60",
          "bmmc": "泰业公司"
        }, {
          "bm": "07",
          "bmmc": "新特药品有限公司"
        }, {
          "bm": "13",
          "bmmc": "安通医药"
        }, {
          "bm": "90",
          "bmmc": "武汉阳光"
        }, {
          "bm": "89",
          "bmmc": "江西公司"
        }, {
          "bm": "52",
          "bmmc": "贵黔东南医药"
        }, {
          "bm": "14",
          "bmmc": "渝和平器械"
        }, {
          "bm": "49",
          "bmmc": "贵州南区公司"
        }, {
          "bm": "41",
          "bmmc": "自贡公司"
        }, {
          "bm": "78",
          "bmmc": "豪恩医药"
        }, {
          "bm": "61",
          "bmmc": "渝和平批发"
        }, {
          "bm": "64",
          "bmmc": "渝科瑞制药"
        }, {
          "bm": "K4",
          "bmmc": "贵州铜仁分公司"
        }, {
          "bm": "91",
          "bmmc": "湖北恒安泽医药"
        }, {
          "bm": "95",
          "bmmc": "湖北诺康医药"
        },{
          "bm": "F9",
          "bmmc": "重药武隆医药"
        },{
          "bm": "J1",
          "bmmc": "绵阳聚合堂"
        },{
          "bm": "J3",
          "bmmc": "湖北黄冈医司"
        },{
          "bm": "K3",
          "bmmc": "湖北宜昌恒康医司"
        }, {
          "bm": "K6",
          "bmmc": "贵州黔南公司"
        }, {
          "bm": "K5",
          "bmmc": "重药巫溪公司"
        },{
           "bm": "K7",
          "bmmc": "河南重药"
        },{
           "bm": "62",
          "bmmc": "重庆彭水医药"
        }]
    }
  },

  created(){
  this.isIE();
  },
  mounted(){
 this.aa();
  },
  methods:{
    aa(){
      var Foo=function(){} 
      var f1=new Foo(); 
      f1.a=10;Foo.prototype.a=100;
      Foo.prototype.b=200;
      console.log(f1.a);
      console.log(f1.b);
    },
     isIE() {        //判断ie
      var version=window.navigator.platform;
           if (version=="Win32" || version=="MacPPC" || version=="Linuxi586"){
        this.photos=false;
        return true;
      } else {
        this.photos=true;
        return false;

      }},
    photo(){
          let _this = this
          window.XuntongJSBridge.call("scanQRCode",  {
          "needResult":1
        }, function(result) {
            let qstr = result.data.qrcode_str;
            alert(qstr);
            _this.spbm=$("#spbm").val(qstr);
        });
    },
    submit(){
      if(this.name==''){
        mui.toast('请输入商品名称或编码');
        return;
      }
      this.$router.push({path:'/list',query:{name:this.name,company:this.company,factory:this.factory}})
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mui-bar{
  position: fixed;
  top: 0;
}
h5{
  color: #333;
  font-size: 16px;
}
/* .fa-camera{
  position: absolute;
  right: 0;
  left: 0;
} */

</style>
