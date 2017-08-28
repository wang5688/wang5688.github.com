import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import New from './components/new/new.vue'
import List from './components/list/list.vue'
import Singer from './components/singer/singer.vue'
import Ring from './components/ring/ring.vue'
import Rank from './components/rank/rank.vue'
import mint from 'mint-ui'
import RankInfo from './components/rank/rank_info.vue'
import store from './store/store.js'
require('./assets/scss/reset.scss')

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(mint);

var routes = [
    { path : '/', redirect : '/new' },
    { path : '/new', component : New },
    { path : '/rank', component : Rank },
    { path : '/list', component : List },
    { path : '/singer', component : Singer },
    { path : '/rings', component : Ring },
    { path : '/rank/info/:id', component : RankInfo }
]

var router = new VueRouter({
    routes,
    linkActiveClass : 'active'
})

new Vue({
    router,
    store,
    el : '#app',
    render : h => h(App)
})
