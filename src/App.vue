<template>
  <div>
    <div class="spinnerloading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div id="app">     
       <transition :name="transitionName" >
       <keep-alive exclude="Detail"> 
            <router-view class="child-view" ></router-view> 
       </keep-alive>             
     </transition>  
    </div>
  </div>
</template>

<script>
import Home from './components/Home'

export default {
  name: 'App',
  components: {
    Home
  },
  data () {
    return {
      transitionName:'slide-left'
    }
  },
    watch: {
    '$route' (to, from) {
      let isBack = eval(sessionStorage.isBack)
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = '  slide-left'
      }
      sessionStorage.isBack = false;

    }
  },

}
</script>

<style>
  .child-view {
    transition:all .4s ease;
    position: absolute;
    width: 100%;

  }
  .slide-left-enter,.slide-right-leave-active {
    opacity:0;
    -webkit-transform:translate(100%,0);
    transform:translate(100%,0);

  }
  .slide-left-leave-active,.slide-right-enter {
    opacity:0;
    -webkit-transform:translate(-100%,0);
    transform:translate(-100%,0);

  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  touch-action: none;
}
.spinnerloading {
  margin: 100px auto 0;
  width: 150px;
  text-align: center;
  position: fixed;
  left: 50%;
  margin-left: -75px;
  top: 26%;
  z-index: 9999999;
  display: none;
}
 
.spinnerloading > div {
  width:20px;
  height: 20px;
  background-color: #67CF22;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
  animation: bouncedelay 1.4s infinite ease-in-out;
  /* Prevent first frame from flickering when animation starts */
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.spinnerloading .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
 
.spinnerloading .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
 
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
.mui-toast-container{
  top: 42%;
  width: 200px;
}
</style>
