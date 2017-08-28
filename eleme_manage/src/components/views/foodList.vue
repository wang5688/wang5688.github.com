<template lang="html">
    <div class="foodlist">
        <el-table style="width : 100%;" :data="foodData" class="food-table">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="table-expand">
                        <el-form-item label="食品名称">
                            <span>{{props.row.name}}</span>
                        </el-form-item>
                        <el-form-item label="餐馆名称">
                            <span>{{props.row.restaurant_name}}</span>
                        </el-form-item>
                        <el-form-item label="食品 ID">
                            <span>{{props.row.item_id}}</span>
                        </el-form-item>
                        <el-form-item label="餐馆 ID">
                            <span>{{props.row.restaurant_id}}</span>
                        </el-form-item>
                        <el-form-item label="食品介绍">
                            <span>{{props.row.description}}</span>
                        </el-form-item>
                        <el-form-item label="餐馆地址">
                            <span>{{props.row.restaurant_address}}</span>
                        </el-form-item>
                        <el-form-item label="食品评分">
                            <span>{{props.row.rating}}</span>
                        </el-form-item>
                        <el-form-item label="食品分类">
                            <span>{{props.row.category_name}}</span>
                        </el-form-item>
                        <el-form-item label="月销量">
                            <span>{{props.row.month_sales}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="食品名称" prop="name"></el-table-column>
            <el-table-column label="食品介绍" prop="description"></el-table-column>
            <el-table-column label="评分" prop="rating"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="edit(scope.row, scope.$index)">编辑</el-button>
                    <el-button size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 修改食品信息 -->
        <div class="edit-food">
            <el-dialog title="修改食品信息" :visible.sync="editFoodShow">
                <el-form :model="rowData">
                    <el-form-item label="食品名称" label-width="100px">
                        <el-input v-model="rowData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="食品介绍" label-width="100px">
                        <el-input v-model="rowData.description"></el-input>
                    </el-form-item>
                    <el-form-item label="食品分类" label-width="100px">
                        <el-select v-model="value">
                            <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="食品图片" label-width="100px">
                        <el-upload
                            class="avatar-uploader"
                            :action="'http://images.cangdu.org/v1/addimg/shop'"
                            :show-file-list="false"
                            :on-success="handleAvatarSucc"
                            :before-upload="beforeUpload">
                                <img v-if="rowData.image_path" :src="'http://images.cangdu.org/'+rowData.image_path" class="avatar" alt="">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                    </el-form-item>
                    <el-form-item class="edit-table">
                        <el-table :data="rowData.specfoods">
                            <el-table-column label="规格" prop="specs_name"></el-table-column>
                            <el-table-column label="包装" prop="packing_fee"></el-table-column>
                            <el-table-column label="价格" prop="price"></el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button size="small" type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <template>
                            <el-button type="primary" class="add-standard">添加规格</el-button>
                        </template>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editFoodShow = false">取消</el-button>
                    <el-button type="primary">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    import { getFoods, getRestaCate } from '../../utils/getData.js'

    export default {
        created() {
            getFoods({
                limit : 20,
                offset : 0,
                restaurant_id : null
            }, (res) => {
                this.foodData = res
            })
        },
        data() {
            return {
                foodData : [],
                editFoodShow : false,
                rowData : [],
                value : '',
                categoryList : []
            }
        },
        methods : {
            initData() {

            },
            edit(row, index) {
                this.rowData = row
                this.editFoodShow = true
                // 获取但钱店铺视频分类
                getRestaCate(row.restaurant_id, (res) => {
                    this.categoryList = res.category_list

                    this.categoryList.forEach((item, index) => {
                        if(item.id == row.category_id) {
                            this.value = item.name
                        }
                    })
                })
            },
            handleAvatarSucc(res, file) {
                if (res.status == 1) {
                   this.editData.image_path = res.image_path;
               }else{
                   this.$message.error('上传图片失败！');
               }
            },
            beforeUpload(file) {
                const isRightType = (file.type == 'image/jpeg') || (file.type == 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if(!isRightType) {
                    this.$message.error('上传图片只能是 jpg 格式')
                }
                if(!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB')
                }
                return isRightType && isLt2M
            }
        }
    }
</script>

<style lang="scss">
    .foodlist {
        height: 900px;
        overflow-y: scroll;
        .food-table {
            padding: 20px;
            .table-expand label {
                width: 90px;
                color: #99a9bf;
            }
            .table-expand .el-form-item {
                margin-right: 0;
                margin-bottom: 0;
                width: 45%;
            }
        }
        .edit-food {
            .el-form-item {
                .el-input {
                    display: inline-block;
                    width: 100%;
                }
            }

            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #20a0ff;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }
            .avatar {
                width: 120px;
                height: 120px;
                display: block;
            }
            .edit-table {
                .add-standard {
                    margin-top: 20px;
                }
                text-align: center;
            }
        }
    }
</style>
