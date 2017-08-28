import Home from '../components/views/home.vue'
import Manage from '../components/views/manage.vue'
import Login from '../components/views/login.vue'
import UserList from '../components/views/userList.vue'
import ShopList from '../components/views/ShopList.vue'
import FoodList from '../components/views/foodList.vue'
import AddGoods from '../components/views/addGoods.vue'

const routes = [
    {
        path : '/',
        component : Login
    },
    {
        path : '/manage',
        component : Manage,
        children : [
            { path : '/', component : Home },
            { path : '/userlist', component : UserList },
            { path : '/shoplist', component : ShopList },
            { path : '/foodlist', component : FoodList },
            { path : '/addGoods', component : AddGoods }
        ]
    }

];

export default routes
