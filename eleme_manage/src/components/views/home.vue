<template lang="html">
    <div class="home">
        <div class="content-title">
            <h1>数据统计</h1>
        </div>
        <div class="data-nav">
            <el-row :gutter="20" class="data-header">
                <el-col :span="5">
                    <div class="data-list today-head">
                        <span>当日数据：</span>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="data-list">
                        <i>{{datas.api.day}}</i>
                        <span>API请求量</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="data-list">
                        <i>{{datas.users.day}}</i>
                        <span>新增用户</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="data-list">
                        <i>{{datas.orders.day}}</i>
                        <span>新增订单</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="data-list">
                        <i>{{datas.admin.day}}</i>
                        <span>新增管理员</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="data-header">
                <el-col :span="5">
                    <div class="data-list today-head total-data">
                        <span>总数据：</span>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="data-list">
                        <i>{{datas.api.all}}</i>
                        <span>API请求量</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="data-list">
                        <i>{{datas.users.all}}</i>
                        <span>注册用户</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="data-list">
                        <i>{{datas.orders.all}}</i>
                        <span>订单</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="data-list">
                        <i>{{datas.admin.all}}</i>
                        <span>管理员</span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {
        getApi,
        getTotalApi,
        getUsers,
        getTotalUsers,
        getOrders,
        getTotalOrders,
        getAdmin,
        getAdminAll
    } from '../../utils/getData.js'

    export default {
        mounted() {
            // 获取基本数据
            getApi(this.getDate(), (res) => {
                this.datas.api.day = res.count
            })
            getTotalApi((res) => {
                this.datas.api.all = res.count
            })
            getUsers(this.getDate(), (res) => {
                this.datas.users.day = res.count
            })
            getTotalUsers((res) => {
                this.datas.users.all = res.count
            })
            getOrders(this.getDate(), (res) => {
                this.datas.orders.day = res.count
            })
            getTotalOrders((res) => {
                this.datas.orders.all = res.count
            })
            getAdmin(this.getDate(), (res) => {
                this.datas.admin.day = res.count
            })
            getAdminAll((res) => {
                this.datas.admin.all = res.count
            })

            console.log(this.datas)
        },
        data() {
            return {
                datas : {
                    api : {},
                    users : {},
                    orders : {},
                    admin : {}
                }
            }
        },
        methods : {
            getDate() {
                let date = new Date();
                let m = date.getMonth() + 1;
                let d = date.getDate();
                return `${date.getFullYear()}-${m < 10 ? '0' + m : '' + m}-${d < 10 ? '0' + d : '' + d}`;
            }
        }
    }
</script>

<style lang="scss">
    .home {
        width: 100%;
        .content-title {
            font-size: 30px;
            text-align: center;
            padding: 20px;
            margin-bottom: 20px;
        }
        .data-nav {
            padding: 0 40px;
        }
        .data-header {
            margin-bottom: 20px;
            margin-left: 20px;
            .data-list {
                font-size: 14px;
                padding: 0 10px;
                border-radius: 6px;
                color: #000;
                background: #e5e9f2;
                text-align: center;
                i {
                    font-size: 26px;
                }
            }
            .today-head {
                font-size: 24px;
                color: #fff;
                background: #ff9800;
                &.total-data {
                    background: #20a0ff;
                }
            }
        }
    }
</style>
