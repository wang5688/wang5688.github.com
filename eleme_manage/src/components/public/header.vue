<template lang="html">
    <div class="header-container">
        <!-- 面包屑 -->
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path : '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
        }
    }
</script>

<style lang="scss">
    .header-container {
        width: 100%;
        height: 60px;
        background: #eff2f7;
        padding-left: 20px;
        display: flex;
        .breadcrumb {
            align-self: center;
        }
    }
</style>
