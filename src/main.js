// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import router from '../router/index.js'
import axios from "axios"
import axio from './axio'
import Mui from 'vue-awesome-mui'
import 'vue-awesome-mui/mui/dist/css/mui.css'
import "vue-awesome-mui/mui/examples/hello-mui/css/icons-extra.css";
/*import "vue-awesome-mui/mui/js/mui.js";*/
  import 'url-search-params-polyfill';
  import "babel-polyfill";
Vue.use(Mui)
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.baseUrl = "http://apptest.cq-p.com.cn:1014" ;
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

Vue.prototype.getNowFormatDate = function (){ //获取当前日期
  var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHours >= 0 && strHours <= 9) {
        strHours = "0" + strHours;
    }
     if (strMinutes >= 0 && strMinutes <= 9) {
        strMinutes = "0" + strMinutes;
    }
     if (strSeconds >= 0 && strSeconds <= 9) {
     strSeconds = "0" + strSeconds;
    }
   var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + strHours + seperator2 + strMinutes
            + seperator2 + strSeconds;
           
    return currentdate;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
    axio,
  components: { App },
  template: '<App/>'
})
