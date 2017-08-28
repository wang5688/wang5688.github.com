import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResouce from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import $ from 'jquery'
import App from './App.vue'
import './assets/scss/index.scss'
import routes from './router/index'
import store from './store/index'


Vue.use(VueRouter)
Vue.use(VueResouce)
Vue.use(ElementUI)

let router = new VueRouter({
    routes
})

new Vue({
    el : '#app',
    store,
    router,
    render : h => h(App)
})
