import Vue from 'vue';
import vue2select from '@/index';
import App from './app.vue';

Vue.component('V2Select', vue2select);

export default new Vue({
   el: '#app',
   render: (h) => h(App)
});
