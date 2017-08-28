<template lang="html">
    <div class="nav">
        <el-menu :default-active="defaultActive" @open="handleOpen" @close="handleClose" theme="dark" :router="true">
            <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>

            <el-submenu index="2">
                <template slot="title"><i class="el-icon-document"></i>数据管理</template>
                <!-- 子菜单 -->
                <el-menu-item-group>
                    <el-menu-item index="userlist">用户列表</el-menu-item>
                    <el-menu-item index="shoplist">商家列表</el-menu-item>
                    <el-menu-item index="foodlist">食品列表</el-menu-item>
                    <el-menu-item index="2-4">订单列表</el-menu-item>
                    <el-menu-item index="2-5">管理员列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
                <!-- 子菜单 -->
                <el-menu-item-group>
                    <el-menu-item index="3-1">添加商铺</el-menu-item>
                    <el-menu-item index="addGoods">添加商品</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title"><i class="el-icon-star-on"></i>图表</template>
                <!-- 子菜单 -->
                <el-menu-item-group>
                    <el-menu-item index="4-1">用户分布</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
                <template slot="title"><i class="el-icon-edit"></i>编辑</template>
                <!-- 子菜单 -->
                <el-menu-item-group>
                    <el-menu-item index="5-1">文本编辑</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="6">
                <template slot="title"><i class="el-icon-setting"></i>设置</template>
                <!-- 子菜单 -->
                <el-menu-item-group>
                    <el-menu-item index="6-1">管理员设置</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="7">
                <template slot="title"><i class="el-icon-information"></i>说明</template>
                <!-- 子菜单 -->
                <el-menu-item-group>
                    <el-menu-item index="7-1">说明</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
    import '../views/userList.vue'

    export default {
        components : {},
        methods : {
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose() {

            }
        },
        computed : {
            defaultActive() {
                return this.$route.path.replace('/', '')
            }
        }
    }
</script>

<style lang="scss">
    .nav {
        height: 100%;
        .el-menu {
            height: 100%;
        }
    }

</style>
