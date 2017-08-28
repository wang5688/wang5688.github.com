<template lang="html">
    <div class="shop-list">
        <el-table stripe style="width : 100%;" align-self="center" :data="tableData">
            <el-table-column prop="name" label="店铺名称" align="center"></el-table-column>
            <el-table-column prop="address" label="店铺地址" align="center"></el-table-column>
            <el-table-column prop="description" label="店铺介绍" align="center"></el-table-column>
            <el-table-column prop="operate" label="操作" align="center">
                <template scope="scope">
                    <el-button :plain="true" type="info" size="mini" @click="editShop(scope.$index, scope.row)">编辑</el-button>
                    <el-button :plain="true" type="info" size="mini" @click="addFood(scope.$index, scope.row)">添加食品</el-button>
                    <el-button type="danger" size="mini" @click="remove">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pages">
            <el-pagination
                @current-change="handleCurrent($event)"
                :current-page.sync="currentPage"
                :page-size="20"
                layout="total, prev, pager, next"
                :total="pageTotal"
            ></el-pagination>
        </div>

        <!-- 弹出框 -->
        <div class="edit-box">
            <el-dialog title="修改店铺信息" :visible.sync="editShow">
                <el-form :model="editData">
                    <el-form-item label="店铺名称">
                        <el-input v-model="editData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input v-model="editData.address"></el-input>
                        <p v-show="city">当前城市：{{city.name}}</p>
                    </el-form-item>
                    <el-form-item label="店铺介绍">
                        <el-input v-model="editData.description"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="editData.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺分类">
                        <el-cascader :options="categoryOptions" v-model="selectedCategory" change-on-select></el-cascader>
                    </el-form-item>
                    <el-form-item label="商铺图片">
                        <el-upload
                            class="avatar-uploader"
                            :action="'http://images.cangdu.org/v1/addimg/shop'"
                            :show-file-list="false"
                            :on-sucess="handleAvatarSucc"
                            :before-upload="beforeUpload">
                                <img v-if="editData.image_path" :src="'http://images.cangdu.org/'+editData.image_path" alt="" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editShow = false">取消</el-button>
                    <el-button type="primary" @click="updateShop">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getResta, getReCount, getCategory, cityPos, updateShop } from '../../utils/getData.js'

    export default {
        data() {
            return {
                tableData : [],
                currentPage : 1,
                pageTotal : 0,
                editShow : false,
                editData : {},
                // 店铺分类
                selectedCategory : [],
                categoryOptions : [],
                // 城市
                city : {}
            }
        },
        created() {
            this.initData();

        },
        methods : {
            initData() {
                getResta({
                    latitude : '31.22967',
                    longitude : '121.4762'
                }, (res) => {
                    this.tableData = res
                    console.log(res)
                })

                // 商铺数量
                getReCount((res) => {
                    this.pageTotal = res.count
                })
                // 获取定位城市
                cityPos((res) => {
                    this.city = res
                })
            },
            editShop(index, row) {
                this.editData = row
                console.log(row)
                this.editShow = true
                this.selectedCategory = row.category.split('/')
                getCategory((res) => {
                    if(res.length) {
                        let addnew = {};
                        res.forEach((item, index) => {
                            if(index == 0) return
                            addnew = {
                                value : item.name,
                                label : item.name,
                                children : []
                            }
                            item.sub_categories.forEach((subitem, index) => {
                                if(index == 0) return
                                addnew.children.push({
                                    value : subitem.name,
                                    label : subitem.name
                                })
                            })
                            this.categoryOptions.push(addnew)
                        })
                    }
                })
            },
            addFood(index, row) {
                this.$router.push(`addGoods?restaurant_id=${row.id}`)
            },
            remove() {},
            handleCurrent() {
                getResta({
                    latitude : '31.22967',
                    longitude : '121.4762',
                    offset : (index-1) * 20,
                    limit : 20
                }, (res) => {
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
                })
            },
            updateShop() {
                let data = this.editData
                let selectedCategory = this.selectedCategory.join('/')
                updateShop({
                    id : data.id,
                    name : data.name,
                    address : data.address,
                    description : data.description,
                    phone : data.phone,
                    image_path : data.image_path,
                    category : selectedCategory
                }, (res) => {
                    if(res.status == 1) {
                        // 更新成功
                        this.$message({
                            type : 'success',
                            message : '更新店铺信息成功'
                        })
                    }else {
                        this.$message({
                            type : 'error',
                            message : res.message
                        })
                    }
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
                console.log(file)
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
    .shop-list {
        padding: 20px;
        .pages {
            margin-top: 8px;
        }
        .edit-box {
            .el-dialog {
                .el-form-item {
                    display: flex;
                    .el-form-item__content {
                        flex: 1;
                    }
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
        }
    }
</style>
