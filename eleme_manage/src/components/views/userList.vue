<template lang="html">
    <div>
        <div class="user-list">
            <el-table :data="tableData" stripe style="width: 100%;">
                <el-table-column prop="number" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="date" label="注册日期" width="180" align="center"></el-table-column>
                <el-table-column prop="name" label="用户姓名" width="180" align="center"></el-table-column>
                <el-table-column prop="address" label="注册地址" align="center"></el-table-column>
            </el-table>
        </div>

        <div class="pages">
            <el-pagination
                @size-change="handleSize"
                @current-change="handleCurrent($event)"
                :current-page.sync="currentPage"
                :page-size="20"
                layout="total, prev, pager, next"
                :total="users.count"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        data() {
            return {
                tableData : [],
                currentPage : 1,
                users : 0
            }
        },
        created() {
            this.$http.get('http://cangdu.org:8001/v1/users/list', {
                params : { 'offset' : 0, 'limit' : 20 }
            }).then((res) => {
                if(res.ok) {
                    res = res.body
                    let users = [];
                    res.forEach((data, index) => {
                        let json = {};
                        json.name = data.username
                        json.number = index + 1
                        json.address = data.city
                        json.date = data.registe_time
                        users.push(json)
                    })
                    this.tableData = users;
                    // console.log(this.tableData)
                }
            })

            // 用户注册量
            this.$http.get('http://cangdu.org:8001/v1/users/count').then((res) => {
                if(res.ok) {
                    this.users = res.body
                }
            })
        },
        methods : {
            handleSize() {},
            handleCurrent(index) {
                this.$http.get('http://cangdu.org:8001/v1/users/list', {
                    params : { offset : (index-1) * 20, limit : 20 }
                }).then((res) => {
                    if(res.ok) {
                        res = res.body
                        let user = [];
                        res.forEach((data, index) => {
                            let json = {}
                            json.name = data.username
                            json.number = index + 1
                            json.address = data.city
                            json.date = data.registe_time
                            user.push(json)
                        })
                        this.tableData = user
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .user-list {
        padding: 20px;
    }
</style>
