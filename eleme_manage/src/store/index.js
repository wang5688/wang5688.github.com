import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '../utils/getData'

Vue.use(Vuex)

const store = new Vuex.Store({
    state : {
        adminInfo : {
            avator : 'default.jpg'
        }
    },
    getters : {
        adminInfo : state => state.adminInfo
    },
    mutations : {
        saveAdmin(state, adminInfo) {
            state.adminInfo = adminInfo
        }
    },
    actions : {
        getAdminData({commit, state}) {
            getUserInfo((res) => {
                if(res.status == 1) {
                    commit('saveAdmin', res)
                    console.log(state.adminInfo)
                }else {
                    throw new Error(res)
                }
            })
        }
    }
})

export default store
