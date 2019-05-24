
import axios from 'axios'
import $ from 'jquery'


// http request 拦截器
axios.interceptors.request.use((config) => {
  //打开loading
  $('.spinnerloading').css('display','block');

      return config;
  }, (err) => {
      $('.spinnerloading').css('display','none');
          return Promise.reject(err);
  });

    axios.interceptors.response.use((response) => {
     setTimeout(function(){
      $('.spinnerloading').css('display','none');

    },500);
    if(response.status!=200){
     mui.toast('网络异常');
         $('.spinnerloading').css('display','none');
    }else{
      if(response.data.code==200){
        return response;
      }else{
        if(response){
          return response;
        }else{
          mui.toast('网络异常');
           $('.spinnerloading').css('display','none');
        }
        
      }
    }    
     // return response;     
         
  }, (err) => {
      mui.toast('网络异常');
           $('#Loading').css('display','none');
          return Promise.reject(err);

  });
export default axios