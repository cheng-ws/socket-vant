import Vue from 'vue';
import App from './App';
import { router } from './router';
import 'amfe-flexible';
import axios from './http';
import socketIo from 'socket.io-client';
// const socket = socketIo('127.0.0.1:3000');
import { Notify,Dialog,Icon } from 'vant';
import store from './store';
// import Vant from 'vant';
// import 'vant/lib/index.css';
Vue.prototype.$http = axios;
Vue.prototype.$io = socketIo;
Vue.prototype.$notice = Notify;
Vue.prototype.$dialog = Dialog;
Vue.use(Icon);
new Vue({
  store,
  router,
  el: '#app',
  created () {
    let vm = this;
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(userInfo) {
      vm.$store.commit('USER_INFO',userInfo);
      vm.$store.dispatch('IO_INIT','127.0.0.1:3000');
    }
  },
  render: h => h(App)
});
