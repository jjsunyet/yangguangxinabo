// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Highcharts from 'highcharts'

// 引入以上两项之后，因为我们需要使用3d图表，还需要引入：
import Highcharts3d from 'highcharts-3d'
import echarts from 'echarts'
/*获取url参数工具函数*/
import utils   from './utils/Utils'


/*注册全局方法*/
Vue.prototype.$utils=utils;
Vue.prototype.$echarts = echarts;
/*调用3d图表*/
Highcharts3d(Highcharts);
/*全局注册store*/
import store from './store'
// import './mock/mockServer'
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
