import $ from 'jquery'

const domain = 'http://cangdu.org:8001';

function sendData(url, params, cb) {
    if(!url) return;

    $.ajax({
        url : domain + url,
        type : 'GET',
        data : params,
        success : function(res) {
            if(res) {
                cb && cb(res)
            }
        },
        error : function() {
            console.error('获取数据失败')
        }
    })
}

function postData(url, params, cb) {
    if(!url) return;

    $.ajax({
        url : domain + url,
        type : 'POST',
        data : params,
        success : function(res) {
            if(res) {
                cb && cb(res)
            }
        },
        error : function() {
            console.error('获取数据失败')
        }
    })
}

/**
 * 获取某日API请求量
 */
export const getApi = (date, cb) => sendData(`/statis/api/${date}/count`, {}, cb)
/**
 * 获取所有API请求量
 */
export const getTotalApi = (cb) => sendData(`/statis/api/count`, {}, cb)

/**
 * 获取某日用户注册量
 */
export const getUsers = (date, cb) => sendData(`/statis/user/${date}/count`, {}, cb)
/**
 * 获取所有用户注册量
 */
export const getTotalUsers = (cb) => sendData(`/v1/users/count`, {}, cb)
/**
 * 获取某日订单量
 */
export const getOrders = (date, cb) => sendData(`/statis/order/${date}/count`, {}, cb)

/**
 * 获取所有订单量
 */
export const getTotalOrders = (cb) => sendData(`/bos/orders/count`, {}, cb)

/**
 * 获取新增管理员数量
 */
export const getAdmin = (date,cb) => sendData(`/statis/admin/${date}/count`, {}, cb)

/**
 * 获取管理员数量
 */
export const getAdminAll = (cb) => sendData(`/admin/count`, {}, cb)

/**
 * 获取用户信息
 */
export const getUserInfo = (cb) => sendData('/admin/info', {}, cb)

 /**
  * 登录
  */
 export const loginApp =({ user_name, password }, cb) => postData('/admin/login', { user_name, password }, cb)

  /**
   * 退出
   */
 export const outApp = (cb) => sendData('/admin/singout', {}, cb)

/**
 * 获取商铺列表
 */
export const getResta = ({ latitude, longitude }, cb) => sendData('/shopping/restaurants', { latitude, longitude }, cb)

/**
 * 店铺数量
 */
export const getReCount = (cb) => sendData('/shopping/restaurants/count', {}, cb)

/**
 * 当前店铺分类
 */
export const getCategory = (cb) => sendData('/shopping/v2/restaurant/category', {}, cb)
/*
* 获取当前城市
 */
export const cityPos = (cb) => sendData('/v1/cities', { type : 'guess' }, cb)
/**
 * 更新店铺
 */
export const updateShop = ({id, name, address, description, phone, image_path, category}, cb) => postData('/shopping/updateshop', {id, name, address, description, phone, image_path, category}, cb)

/**
 * 获取食品列表
 */
export const getFoods = ({limit, offset, restaurant_id}, cb) => sendData('/shopping/v2/foods', {limit, offset, restaurant_id}, cb)

/**
 * 获取食品分类
 */
export const getRestaCate = (res_id, cb) => sendData('/shopping/getcategory/'+res_id, {}, cb)
