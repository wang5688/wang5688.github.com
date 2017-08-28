<template>
    <div class="container">
        <!-- 头部 -->
        <v-header :seller="seller"></v-header>
        <!-- nav导航 -->
        <div class="main-nav">
            <div class="nav-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="nav-item">
                <router-link to="/rating">评价</router-link>
            </div>
            <div class="nav-item">
                <router-link to="/store">商家</router-link>
            </div>
        </div>

        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import Header from './components/header/header.vue'

    export default {
        components : {
            'v-header' : Header
        },
        data() {
            return {
                seller : ''
            }
        },
        created() {
            this.$http.get('/api/seller').then((res) => {
                res = res.body
                if(res.errno == 0) {
                    this.seller = res.data
                }
            })
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/var.scss";

    .container {
        .main-nav {
            display: flex;
            justify-content: space-around;
            width: 100%;
            height: px2rem(80px);
            background: #fff;
            border-bottom: 1px solid rgba(7,17,27,.1);
            .nav-item {
                a {
                    font-size: px2rem(28px);
                    color: #4d555d;
                    &.active {
                        color: #f01414;
                    }
                }
            }
        }
    }
</style>
