<template lang="html">
    <div class="add-goods">
        <el-col :span="14" :offset="4" class="add-table">
            <h4 class="form-header">选择食品种类</h4>
            <el-form :model="formData">
                <el-row class="cate-select">
                    <el-form-item label="食品种类" label-width="100px">
                        <el-select placeholder="请选择"></el-select>
                    </el-form-item>
                </el-row>
                <el-row class="add-cate" :class="showAddCategory ? 'showEdit' : ''">
                    <el-form-item label="食品种类" label-width="100px">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="种类描述" label-width="100px">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item class="submit-cate">
                        <el-button type="primary">提交</el-button>
                    </el-form-item>
                </el-row>
                <div class="add-cate-btn" @click="showAddCategory = !showAddCategory">
                    <i class="el-icon-caret-top edit_icon" v-if="addCate"></i>
                    <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
                    <span>添加食品种类</span>
                </div>
            </el-form>
        </el-col>
    </div>
</template>

<script>
    import {getRestaCate} from '../../utils/getData.js'

    export default {
        data() {
            return {
                formData : [],
                showAddCategory : false
            }
        }
    }
</script>

<style lang="scss">
    .add-table {
        margin-top: 20px;
        .form-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .cate-select {
            border: 1px solid #ccc;
            border-top-right-radius: 6px;
            border-top-left-radius: 6px;
            padding: 10px;
            .el-select {
                width: 100%;
            }
        }
        .add-cate {
            height: 0px;
            overflow: hidden;
            background: #f9fafc;
        }
        .submit-cate {
            margin-left: 100px;
        }
        .add-cate-btn {
            text-align: center;
            line-height: 40px;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            border: 1px solid #ccc;
            border-top: none;
            transition: all .4s ease;
            &:hover {
                background: #f9fafc;
                span, .edit_icon {
                    color: #20a0ff;
                }
            }
            span {
                color: #999;
                transition: all .4s;
            }
            .edit_icon{
    			color: #ccc;
    			transition: all 400ms;
    		}
        }
        .showEdit {
            height: 195px;
            padding: 10px;
            border: 1px solid #ccc;
            border-top: none;
        }
    }
</style>
