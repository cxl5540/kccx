<template>
  <div class="hello">
     <header id="header" class="mui-bar mui-bar-nav"  style="background: #2196f3;color: #fff">
    <!--   <router-link to="/home" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link> -->
     <span @click='back' class="mui-icon mui-icon-left-nav mui-pull-left"></span>
      <h1 class="mui-title" style="color: #fff">库存列表</h1>
    <!--   <span @click='reload' class=" mui-pull-right" style="line-height: 44px">刷新</span> -->
    </header>
    <div v-show='yidong' style="height: 100vh">
           <scroller :on-refresh="refresh"
                  :on-infinite="infinite"               
                   ref="my_scroller"
                    v-if="List.length"
                   style="margin-top:40px;"

                    >
          <div style="margin-top: 0px;" class="content">
             <div class="demo-text" v-for='item,index in List' :key='item.index'>
                  <div class="itemdetail" >
                      <p  style="border-bottom: 1px solid #eee;color: #2196f3;font-size: 17px;padding: 8px 0">商品编码：{{item.spbm}}</p>
                      <div class="contentdetail">
                        <p style="margin-top: 6px"><span>商品名称</span><span>{{item.pm}}</span></p>
                         <p><span>规格</span><span>{{item.gg}}</span></p>
                        <p><span>分公司</span><span>{{item.fgsbm}}</span></p>
                        <p><span>可调库存</span><span>{{item.ywsl}}</span></p>
                        <p><span>厂牌</span><span>{{item.cp}}</span></p>   
                      </div>
                       <router-link :to="{path:'/detail',query: {spbm: item.spbm,cp:item.cp,fgsbm:item.fgsbm}}"> 
                        <p style="border-top: 1px solid #eee;display: flex;justify-content: space-between;">
                          <span style="color: rgb(33, 150, 243)">查看详情</span>
                          <span  style="font-size: 16px;color: #999>"><i class="fa fa-angle-right"></i></span>
                        </p>
                      </router-link>
                  </div>
                </div>
            </div>
      </scroller>
     </div>
      <div style="margin-top:46px" v-show='pc'>
             <div class="demo-text" v-for='item,index in List' :key='item.index'>
                  <div class="itemdetail" >
                      <p  style="border-bottom: 1px solid #eee;color: #333;font-size: 17px;padding: 8px 0">商品编码：{{item.spbm}}</p>
                      <div class="contentdetail">
                        <p><span>商品名称</span><span>{{item.pm}}</span></p>
                         <p><span>规格</span><span>{{item.gg}}</span></p>
                        <p><span>分公司</span><span>{{item.fgsbm}}</span></p>
                        <p><span>可调库存</span><span>{{item.ywsl}}</span></p>
                        <p><span>厂牌</span><span>{{item.cp}}</span></p>   
                      </div>
                     
                        <p style="border-top: 1px solid #eee;display: flex;justify-content: space-between;" @click='godetail(item)'>
                          <span style="color: rgb(33, 150, 243)" >查看详情</span>
                          <span  style="font-size: 16px;color: #999>"><i class="fa fa-angle-right"></i></span>
                        </p>
                    
                  </div>
                </div>
            </div>
            <div  @click='gotop' class="top" style="position:fixed;bottom: 10px;right: 10px;z-index: 99999;color: #2196f3">
              <span style="font-size: 26px"><i class="fa fa-hand-o-up" aria-hidden="true"></i></span>
            </div>
  </div>
</template>

<script>
  import 'url-search-params-polyfill';
export default {
  name: 'home',
  data () {
    return {
      enable:true,
      yidong:true,
      pc:false,
      name:'',
      company:'',
      factory:'',
      List:[],
      page:1,
      hasNext:false,
    options: [
        '紧急严重', '紧急','严重', '一般',
      ],
        scollY: null,// 离底部距离有多少
    }
  },
  created(){
/*this.init();*/
  this.isIE();  
  },
  mounted(){
  this.getlist();
  this.aaa();
  },
 beforeRouteEnter(to,from,next){
   if(from.path=='/home'){
     sessionStorage.askPositon = '';
     to.meta.keepAlive = false;     
       next(vm=>{
        vm.List=[];
         vm.page=1;
         vm.getlist();
       })
  
   }else{
   if(!sessionStorage.askPositon || from.path == '/list'){//当前页面刷新不需要切换位置
    next();
    }else{
    next(vm => {
    if(vm && vm.$refs.my_scroller){//通过vm实例访问this
    setTimeout(function () {
      vm.$refs.my_scroller.scrollTo(0, sessionStorage.askPositon, true);
      },0)//同步转异步操作
      }
     })
     }
   }
 },
beforeRouteLeave(to,from,next){//记录离开时的位置
  if(to.path=='/detail'){
  sessionStorage.askPositon = this.$refs.my_scroller && this.$refs.my_scroller.getPosition() && this.$refs.my_scroller.getPosition().top;
    next();
  }else{
    next();
  }
},
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods:{
    gotop(){
     /* $('._v-content').css('transition','1s all');*/
        $('._v-content').css('transform','translate3d(0px, 0px, 0px) scale(1)');
        this.page=1;
        this.List=[];
        let _this=this;
        _this.hasNext=false;
        setTimeout(function(){
          console.log( _this.page)
           _this.getlist();
            $('.top').hide();
        },500)
      
       
    },
    aaa(){
      $('.top').hide();
     
    },
     onScroll() {          //ie滚动
       /*  console.log(this.scollY )*/
         this.scollY = this.getScrollTop() + this.getWindowHeight() - this.getScrollHeight();
          if(this.enable){
              this.enable=false;
              if(this.scollY>-10){
                this.page=this.page+1;
                this.getlist();
              }else{
                this.enable=true;
              }
            }
            return;
    },
    back(){
      this.enable=false;
     this.$router.push('/home');
    }, 
    isIE() {        //判断ie
       var version=window.navigator.platform;
    if (version=="Win32" || version=="MacPPC" || version=="Linuxi586") {

     window.addEventListener('scroll', this.onScroll);
        this.pc=true;
         this.yidong=false;
        return true;
      } else {
        this.yidong=true;
        this.pc=false;
        return false;

      }},
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

  getlist(callback){                                             //获取列表
   let url='http://apppage.cq-p.com.cn:1015/SOA/ERP/GetShareStockList';
let _this=this;
    _this.$http.get(url,{params: {
                      pageNum: this.page,
                      pageSize: 10,
                      pm: this.$route.query.name,
                      cp: this.$route.query.factory,
                      fgsbm:this.$route.query.company,}})
    .then( (response) => {
        callback&&callback();
        let res=JSON.parse(response.data).rows;
        console.log(JSON.parse(response.data))
        console.log(res)
        if(res!==undefined){
          if(res.length<10){             //无下一页
            _this.hasNext=false;
          }else{
              _this.hasNext=true;           //有下一页 
          }
          if(_this.page==1){
            _this.List=res;
          }else{
            for(var i=0;i<res.length;i++){
              _this.List.push(res[i])
            }
          }
        }else{
          mui.toast('暂无更多数据');
            _this.hasNext=false;
            if (version=="Win32" || version=="MacPPC" || version=="Linuxi586"){
              mui.toast('没有更多数据');
              return;
            }
        }
      _this.enable=true;
       console.log(_this.List);
    })
    .catch( (error) => {
        mui.toast('暂无更多数据');
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
            _this.getlist();
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
              _this.getlist(function(){
                done()
              });
          }, 1000)
        } else {
          done("noDataText");
        }
      },
      godetail(item){
        this.enable=false;
       this.$router.push({path:'/detail',query:{spbm: item.spbm,cp:item.cp,fgsbm:item.fgsbm}})
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
.itemdetail>div{
  color: #999;
  font-size: 13px;
}
.contentdetail>p{
  display: flex;
  justify-content: space-between;
}
p>span:last-child{
  color: #000;
}
/* ._v-content{
  transition: 1s all !important;
} */
</style>
