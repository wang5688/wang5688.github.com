import Goods from '../components/goods/goods.vue'
import Rating from '../components/comment/comments.vue'
import Store from '../components/shop/shop.vue'

module.exports = [
    { path : '/', redirect : '/goods' },
    { path : '/goods', component : Goods },
    { path : '/rating', component : Rating },
    { path : '/store', component : Store }
]
