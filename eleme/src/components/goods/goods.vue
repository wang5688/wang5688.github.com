<template lang="html">
    <div>
        <div class="goods">
            <div class="left-nav" ref="menuwrapper">
                <ul class="nav-list">
                    <li v-for="(item, index) in goods" class="nav-item" @click.stop.prevent="selectItem(index)" :class="{ 'active' : currentIndex == index}">
                        <a href="javascript:;"><i class="icon" v-show="item.type !== -1" :class="'type-'+item.type"></i>{{item.name}}</a>
                    </li>
                </ul>
            </div>
            <div class="right-content" ref="foodwrapper">
                <div class="content-wrapper">
                    <div class="cont-list" ref="foodList">
                        <div v-for="(hot,index) in goods" key="index" class="cont-item" ref="contItem">
                            <h5 class="cont-title color-2">{{hot.name}}</h5>
                            <div class="food-list">
                                <div v-for="(food, index) in hot.foods" class="foods" :key="index" @click="foodDetail(food,$event)">
                                    <img :src="food.icon" :alt="food.name" class="food-icon">
                                    <div class="food-info">
                                        <p class="food-name">{{food.name}}</p>
                                        <p class="desc" v-show="food.description">{{food.description}}</p>
                                        <p class="sell-count">月售{{food.sellCount}}份<i class="rating">好评率{{food.rating}}%</i></p>
                                        <p class="price"><b>￥</b>{{food.price}}<i class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</i></p>
                                    </div>
                                    <!-- 添加 -->
                                    <div class="addControl">
                                        <add-control :food="food" @add="drop"></add-control>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- food详情页 -->
        <food-detail ref="food" :food="selectedFood"></food-detail>
        <!-- 底部订单车 -->
        <shopcart :selectFood="selectFood" :seller="seller" ref="shopcart"></shopcart>
    </div>
</template>

<script>
    import Shopcart from '../shopcart/shopcart.vue';
    import AddControl from '../addcontrol/add.vue';
    import Food from '../food/food.vue';
    import BScroll from 'better-scroll';

    export default {
        components : {
            shopcart : Shopcart,
            'add-control' : AddControl,
            'food-detail' : Food
        },
        data() {
            return {
                goods : [],
                seller : [],
                selectedFood : {},
                scrollY : 0,
                listHeight : [],
                classMap: ['decrease','discount','special','invoice','guarantee']
            }
        },
        computed : {
            currentIndex() {
                for(let i=0; i<this.listHeight.length; i++){
                    //判断当currentIndex在height1和height2之间的时候显示
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i+1];
                    //最后一个区间没有height2
                    if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                        return i;
                    }
                }
                return 0;
            },
            selectFood() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if(food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods;
            }
        },
        created() {
            this.$http.get('/api/elm').then((res) => {
                res = res.body
                if(res.errno == 0) {
                    this.goods = res.data.goods
                    this.seller = res.data.seller

                    this.$store.commit('setGoods', this.goods)

                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    })
                }
            })
        },
        methods : {
            drop(el) {
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(el)
                })
                // 将选中的food添加进购物车
            },
            foodDetail(food, e) {
                this.selectedFood = food;
                this.$refs.food.show()
            },
            _initScroll() {
                this.muneScroll = new BScroll(this.$refs.menuwrapper, {
                    click : true
                })
                this.foodScroll = new BScroll(this.$refs.foodwrapper, {
                    click : true,
                    probeType : 3
                })
                // 设置坚挺滚动滚动位置
                this.foodScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            _calculateHeight() {
                let foodList = this.$refs.contItem;
                // console.log(foodList)
                let height = 0;
                // 第一个高度送入数组
                this.listHeight.push(height);
                // 将每个敢赌送入数组
                for(let i = 0; i < foodList.length; i++) {
                        let item = foodList[i]
                        height += item.clientHeight
                        this.listHeight.push(height);
                    }
            },
            selectItem(index) {
                let foodItem = this.$refs.contItem;
                let el = foodItem[index];

                this.foodScroll.scrollToElement(el, 300)
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .goods {
        background: #fff;
        display: flex;
        height: px2rem(1334px - 80px - 268px);
        .left-nav {
            width: px2rem(160px);
            height: 100%;
            background: #f3f5f7;
            overflow: hidden;
            .nav-list {
                width: 100%;
                padding-bottom: px2rem(96px);
                .nav-item {
                    display: table;
                    width: px2rem(160 - 48px);
                    height: px2rem(108px);
                    border-bottom: 1px solid rgba(7,17,27,.1);
                    line-height: px2rem(28px);
                    padding: 0 px2rem(24px);
                    a {
                        display: table-cell;
                        vertical-align: middle;
                        font-size: px2rem(24px);
                        font-weight: 200;
                        line-height: px2rem(28px);
                    }
                    &.active {
                        background: #fff;
                        a {
                            color: #00a0dc;
                        }
                    }
                    .icon {
                        vertical-align: top;
                        width: px2rem(24px);
                        height: px2rem(24px);
                        display: inline-block;
                        margin-right: px2rem(4px);
                        background-size: px2rem(24px) px2rem(24px);
                        &.type-1 {
                            @include bg-img('discount_3');
                        }
                        &.type-2 {
                            @include bg-img('special_3');
                        }
                    }
                }
            }
        }
        .right-content {
            flex: 1;
            height: 100%;
            overflow: hidden;
            .content-wrapper {
                padding-bottom: px2rem(96px);
                .cont-list {
                    .cont-title {
                        font-size: px2rem(24px);
                        color: rgb(147,153,159);
                        line-height: px2rem(52px);
                        border-left: 4px solid #d9dde1;
                        background: #f3f5f7;
                        padding-left: px2rem(28px);
                    }
                    .food-list {
                        padding: 0 px2rem(36px);
                        .foods{
                            position: relative;
                            display: flex;
                            display: -webkit-flex;
                            padding: px2rem(36px) 0;
                            border-bottom: 1px solid rgba(7,17,27,.1);
                            .addControl {
                                position: absolute;
                                right: 0;
                                bottom: px2rem(20px);
                            }
                        }
                        &:last-child {
                            border-bottom: none;
                        }
                        .food-icon {
                            width: px2rem(114px);
                            height: px2rem(114px);
                            margin-right: px2rem(20px);
                        }
                        .food-info {
                            .food-name {
                                font-size: px2rem(28px);
                                line-height: px2rem(28px);
                                margin-bottom: px2rem(16px);
                            }
                            .desc {
                                font-size: px2rem(20px);
                                color: rgb(147,153,159);
                                line-height: px2rem(30px);
                                margin-bottom: px2rem(16px);
                            }
                            .sell-count {
                                font-size: px2rem(20px);
                                color: rgb(147,153,159);
                                line-height: px2rem(20px);
                                .rating {
                                    margin-left: px2rem(24px);
                                }
                            }
                            .price {
                                font-size: px2rem(28px);
                                color: #f01414;
                                font-weight: 700;
                                line-height: px2rem(48px);
                                b {
                                    font-size: px2rem(20px);
                                    font-weight: normal;
                                }
                                .old-price {
                                    font-size: px2rem(20px);
                                    font-weight: 700;
                                    text-decoration: line-through;
                                    color: rgb(147,153,159);
                                    margin-left: px2rem(16px);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
