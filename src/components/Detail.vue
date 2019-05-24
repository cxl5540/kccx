<template>
  <div class="hello">
     <header id="header" class="mui-bar mui-bar-nav"  style="background: #2196f3;color: #fff">
    <span @click='back' class="mui-icon mui-icon-left-nav mui-pull-left"></span>
      <h1 class="mui-title" style="color: #fff">库存详情</h1>
    </header>
    <div style="height: 100vh;" v-show='yidong'>
          <scroller :on-refresh="refresh"
                  :on-infinite="infinite"               
                   ref="my_scroller"
                   v-if="List.length"
                   style="margin-top:0px;"
                    >
     <div style="margin-top: 46px;">
       <div class="demo-text" v-for='item,index in List' :key='item.index'>
                <div class="itemdetail" >
                    <p  style="color: #333;font-size: 17px;padding-top: 8px">{{item.pm}}</p>
                      <p  style="border-bottom: 1px solid #eee;color: #333;font-size: 16px;color: rgb(33, 150, 243)">商品编码：{{item.spbm}}</p>
                    <div class="contentdetail" >
                      <p><span>厂牌</span><span>{{item.lhdw}}</span></p>
                      <p><span>仓库</span><span>{{item.ckbm}}</span></p>
                      <p><span>可调数量</span><span>{{item.ywsl}}</span></p>
                      <p><span>失效日期</span><span>{{item.sxrq}}</span></p>
                      <p><span>品质</span> <span class="red" v-bind:class="{blue:item.blue}">({{item.pzqf}})</span></p>
                    </div>
                    <div class="contentdetail morepc" style="display: none;">
                     <p><span>规格</span></span><span>{{item.gg}}</span></p>
                      <p><span>批号</span><span>{{item.yph}}</span></p>
                      <p><span>分公司</span><span>{{item.fgsbm}}</span></p>
                      <p><span>计量单位</span><span>{{item.jldw}}</span></p>
                      <p><span>剂型</span><span>{{item.jx}}</span></p>
                      <p><span>批发价</span><span>{{item.gjpj}}</span></p>
                      <p><span>零售价</span><span>{{item.lsj}}</span></p>
                      <p><span>含税成本</span><span>{{item.hscb}}</span></p>
                      <p><span>SKU</span><span>{{item.skuid}}</span></p>
                      <p><span>符合两票制</span><span>{{item.lpz}}</span></p>
                      <p><span>来货单位</span><span>{{item.lhdw}}</span></p>
                      <p><span style="color: #8f8f94">备注</span></p>  
                    </div>
                    <div @click='more(index)'>      
                       <p style="border-top: 1px solid #eee;text-align: right;margin: 0;padding: 6px 0">
                       <span style="color: rgb(33, 150, 243);text-decoration: underline;" class ='qqpc'>展开更多</span>               
                     </p>
                    </div>    
                </div>
              </div>
        </div>
        </scroller>
    </div>
     <div style="margin-top: 46px;" v-show='pc'>
       <div class="demo-text" v-for='item,index in List' :key='item.index'>
                <div class="itemdetail" >
                    <p  style="color: #333;font-size: 17px;padding-top: 6px">{{item.pm}}</p>
                      <p  style="border-bottom: 1px solid #eee;color: #333;font-size: 16px;color: rgb(33, 150, 243)">商品编码：{{item.spbm}}</p>
                    <div class="contentdetail" >
                      <p><span>厂牌</span><span>{{item.lhdw}}</span></p>
                      <p><span>仓库</span><span>{{item.ckbm}}</span></p>
                      <p><span>可调数量</span><span>{{item.ywsl}}</span></p>
                      <p><span>失效日期</span><span>{{item.sxrq}}</span></p>
                      <p><span>品质</span> <span class="red" v-bind:class="{blue:item.blue}">({{item.pzqf}})</span></p>                     
                    </div>
                    <div class="contentdetail more" style="display: none;">
                       <p><span>规格{{index}}</span></span><span>{{item.gg}}</span></p>
                        <p><span>批号</span><span>{{item.yph}}</span></p>
                        <p><span>分公司</span><span>{{item.fgsbm}}</span></p>
                        <p><span>计量单位</span><span>{{item.jldw}}</span></p>
                        <p><span>剂型</span><span>{{item.jx}}</span></p>
                        <p><span>批发价</span><span>{{item.gjpj}}</span></p>
                        <p><span>零售价</span><span>{{item.lsj}}</span></p>
                        <p><span>含税成本</span><span>{{item.hscb}}</span></p>
                        <p><span>SKU</span><span>{{item.skuid}}</span></p>
                        <p><span>符合两票制</span><span>{{item.lpz?'是':'否'}}</span></p>
                        <p><span>来货单位</span><span>{{item.lhdw}}</span></p>
                        <p><span style="color: #8f8f94">备注</span></p>  
                    </div>
                    <div @click='more(index)'>      
                       <p style="border-top: 1px solid #eee;text-align: right;margin: 0;padding: 6px 0">
                       <span style="color: rgb(33, 150, 243);text-decoration: underline;" class ='qq'>展开更多</span>
                     <!--   <span  style="font-size: 16px;color: #999>"><i class="fa fa-angle-down " style="margin-top: 6px;" ></i><i class="fa fa-angle-up" style="margin-top: 6px;" ></i></span>  -->                  
                     </p>
                    </div>    
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
      scrollTop:'',
      scollY: null,// 离底部距离有多少
      enable:true,
      page:1,
      yidong:true,
      pc:false,
      hasNext:false,
      isActive:false,
      name:'',
      redClass:'red',
      blueClass:'blue',
      company:'',
      factory:'',
      List:[],
    options: [
        '紧急严重', '紧急','严重', '一般',
      ],
    }
  },
  created(){
/*  this.init();*/
  this.isIE();
  $('.fa-angle-up').hide();
  },
  mounted(){
   this.getdetail();
  },
   deactivated(){
    this.$destroy();
   },
  methods:{
    back(){
      this.enable=false;
      this.$router.go(-1);
    },
   isIE() {        //判断ie
      var version=window.navigator.platform;
           if (version=="Win32" || version=="MacPPC" || version=="Linuxi586"){
         window.addEventListener('scroll', this.onScroll);
        this.pc=true;
         this.yidong=false;
        return true;
      } else {
        this.yidong=true;
        this.pc=false;
        return false;

      }},
    onScroll() {          //ie滚动
       /*  console.log(this.scollY )*/
         this.scollY = this.getScrollTop() + this.getWindowHeight() - this.getScrollHeight();
           console.log(this.enable)
          if(this.enable){
              this.enable=false;
              if(this.scollY>-10){
                console.log('eee');
                this.page=this.page+1;
                this.getdetail();
              }else{
                this.enable=true;
              }
            }
            return;
    },
 
     getScrollTop: function () {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },
    //浏览器视口的高度
    getScrollHeight: function () {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    },
    //浏览器视口的高度
    getWindowHeight: function () {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },
  more(index){
     if (!!window.ActiveXObject || "ActiveXObject" in window) {
           $($('.more')[index]).slideToggle(function(){
            $($('.qq')[index]).html('展开更多');
            if($('.more').is(":visible")){
              $($('.qq')[index]).html('收起');

            }
        });

      } else {
        $($('.morepc')[index]).slideToggle(function(){
            $($('.qqpc')[index]).html('展开更多');
            if($('.morepc').is(":visible")){
              $($('.qqpc')[index]).html('收起');

            }
        });

      } 
  
  },
  getdetail(callback){
   let url='http://apppage.cq-p.com.cn:1015/SOA/ERP/GetShareStockDetail';
let _this=this;
    _this.$http.get(url,{params: {
                      pageNum: this.page,
                      pageSize: '5',
                      spbm: this.$route.query.spbm,
                      cp: this.$route.query.cp,
                      fgsbm:'01',}})
    .then( (response) => {
      callback&&callback();
      let res=JSON.parse(response.data);
      for(var i=0;i<res.rows.length;i++){
        if(res.rows[i].lpz=='0'){
           res.rows[i].lpz='否' 
        }else{
          res.rows[i].lpz='是' 
        }
      }
      console.log(res)
      if(res.rows){
        if(res.rows.length<5){ 
                 _this.hasNext=false;            //有下一页            
                  }else if(!res.rows){
                      _this.hasNext=false;
                  }else{
                     _this.hasNext=true;
                  }
                  if(_this.page==1){
                    _this.List=res.rows;
                  }else{
                    for(var i=0;i<res.rows.length;i++){
                      _this.List.push(res.rows[i])
                    }
                }
      }else{
            _this.hasNext=false;
          if(!!window.ActiveXObject || "ActiveXObject" in window){
              mui.toast('没有更多数据');
              return;
            } 
      }
     _this.enable=true;
    console.log(_this.List)
      for(var i=0;i<res.rows.length;i++){
        res.rows[i].blue=true;  
        if(res.rows[i].pzqf=='不合格'){            
            res.rows[i].blue=false;  
        }
      }
    })
    .catch( (error) => {
      mui.toast('暂无详情');
    /*  this.$router.go(-1);*/
        console.log(error);
    });       

  },

      init(){
       let _this = this  //此this指向的是vue
                window.onmousewheel = function (e) {
            if (e.wheelDelta < 0) {
                _this.$refs.scrollerBottom && (_this.$refs.scrollerBottom.scrollBy(0, 30, false));
                //避免ref中不存在scrollerBottom
            } else {
                _this.$refs.scrollerBottom && (_this.$refs.scrollerBottom.scrollBy(0, -30, false));
            }
          }
      },

     refresh:function(done){         //下拉刷新
        this.page=1;
        let _this=this;
        setTimeout(function(){
            _this.getdetail();
            done();
          },1000)
      

　　　},

      infinite:function(done) {             //上拉加载
        console.log(this.hasNext);
        console.log("触发上拉加载")
        if(this.hasNext == true) {
          let _this = this;
          setTimeout(function() {           
            _this.page = _this.page + 1;
              _this.getdetail(function(){
                done()
              });
          }, 1000)
        } else {
          done("noDataText");
        }
      },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mui-bar{
  position: fixed;
  top: 0;
}
.itemdetail>p{
  margin: 0;
  padding: 6px 0;
}
.itemdetail>a>p{
  margin: 0;
  padding: 6px 0;
}
.itemdetail{
 margin: 6px 8px ;
 border: 1px solid #eee;
 background: #fff;
 border-radius: 6px;
 text-align: left;
 padding: 0px 8px;
  box-shadow:0px 2px 2px #eee;
}
.contentdetail{
padding-top: 6px;
}
.contentdetail>p{
  display: flex;
  justify-content: space-between;
}
p>span:last-child{
  color: #000;
}
.itemdetail>div{
  color: #999;
  font-size: 13px;
}
p{
  margin-bottom: 6px;
}
.red{
  color: red !important;
}
.blue{
  color: blue !important;
}
.fa-angle-up{
  display: none;
  margin-top: 8px;
  position: relative;
  top: 6px;
}
</style>
