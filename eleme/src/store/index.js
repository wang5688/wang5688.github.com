import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        minPrice : 20,
        deliveryPrice : 20,
        selectFood : [],
        good : []
    },
    getters : {
        minPrice : state => state.minPrice,
        deliveryPrice : state => state.deliveryPrice,
        selectFood : state => state.selectFood,
        food : state => state.food,
        good : state => state.good
    },
    mutations : {
        setFood(state, food) {
            // state.selectFood = [...(state.selectFood), food]
            state.selectFood = Object.assign({}, food)
        },
        setPrice(state, price) {
            state.totalPrice = price
        },
        setGoods(state, goods) {
            state.good = goods
        },
        addFood(state, food) {
            state.selectFood = food
        }
    },
    actions : {
        // selectFoods({commit, state}, goods) {
        //     let foods = []
        //     goods.forEach((good, index) => {
        //         good.foods.forEach((food, index) => {
        //             if(food.count) {
        //                 foods.push(food)
        //             }
        //         })
        //     })
        //     commit('addFood', foods)
        // }
    }
})

export default store
