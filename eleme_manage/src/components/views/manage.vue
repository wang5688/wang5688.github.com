<template lang="html">
    <div class="article">
        <el-row class="container">
            <el-col :span="4">
                <!-- 左侧导航 -->
                <main-nav></main-nav>
            </el-col>
            <el-col :span="20">
                <!-- 右侧内容 -->
                <head-container></head-container>

                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import MainNav from '../nav/nav.vue'
    import Header from '../public/header.vue'

    export default {
        components : {
            'main-nav' : MainNav,
            'head-container' : Header
        }


    }
</script>

<style lang="scss">
    .article {
        height: 100%;
        .container {
            height: 100%;
            .el-col {
                height: 100%;
            }
        }
    }
</style>
