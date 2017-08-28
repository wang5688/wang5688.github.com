<template lang="html">
    <div class="login-page">
        <div class="login-box">
            <div class="login-tit">
                <h1>elm</h1>
            </div>
            <el-form :rules='rules' :model="ruleForm" class="login-form">
                <el-form-item prop="username">
                    <el-input placeholder="用户名" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <p class="tip">温馨提示：</p>
                    <p class="tip">未登录过的新用户，自动注册</p>
                    <p class="tip">注册过的用户可以凭账号密码登录</p>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { getUserInfo, loginApp } from '../../utils/getData.js'
    import { mapGetters, mapActions } from 'vuex'


    export default {
        data() {
            return {
                ruleForm : {
                    username : '',
                    password : ''
                },
                rules : {
                    username : [
                        { required : true, message : '请输入用户名', trigger : 'blur' }
                    ],
                    password : [
                        { required : true, message : '请输入密码', trigger : 'blur' }
                    ]
                }
            }
        },
        mounted() {
            if(!this.adminInfo.id) {
                this.getAdminData()
            }
        },
        computed : {
            ...mapGetters(['adminInfo'])
        },
        methods : {
            ...mapActions(['getAdminData']),
            submit() {
                loginApp({
                    user_name : this.ruleForm.username,
                    password : this.ruleForm.password
                }, (res) => {
                    if(res.status == 1) {
                        this.$message({
                            type : 'success',
                            message : '登录成功'
                        })
                        this.$router.push('manage')
                    }else {
                        this.$message.error(res.message)
                    }
                })
            }
        },
        watch : {
            adminInfo(newValue) {
                if(newValue.id) {
                    this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
                }
            }
        }
    }
</script>

<style lang="scss">
    .login-page {
        width: 100%;
        height: 100%;
        background: #324057;
        .login-box {
            position: fixed;
            left: 50%;
            top: 50%;
            margin-left: -160px;
            transform: translateY(-50%);
            .login-tit {
                text-align: center;
                h1 {
                    font-size: 32px;
                    color: #fff;
                }
            }
            .login-form {border-radius: 5px;
                background: #fff;
                text-align: center;
                padding: 25px;
                width: 320px;
                height: 210px;
                margin-top: 50px;
                .el-button {
                    width: 100%;
                }
                .tip {
                    font-size: 12px;
                    color: red;
                    line-height: 16px;
                }
            }
        }

    }
</style>
