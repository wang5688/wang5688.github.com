import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRsource from 'vue-resource'
import App from './App.vue'
import routes from './router/index.js'
import Vuex from 'vuex'
import './assets/scss/index.scss'
import store from './store/index.js'


Vue.use(VueRouter);
Vue.use(VueRsource);

let router = new VueRouter({
    routes,
    linkActiveClass : 'active'
});

new Vue({
    router,
    store,
    el : '#app',
    render : h => h(App)
})
