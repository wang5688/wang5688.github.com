<template lang="html">
    <transition name="slide-right">
        <div class="food-detail" v-show="foodShow" ref="food">
            <div class="wrapper">
                <div class="cover">
                    <img :src="food.image" alt="">
                    <div class="return" @click="foodShow = false">
                        <i class="icon-back">&#xe649;</i>
                    </div>
                </div>
                <div class="infos">
                    <p class="name">{{food.name}}</p>
                    <div class="subs">
                        <span class="sell">月售{{food.sellCount}}份</span>
                        <span class="rete">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span>￥<i class="big">{{food.price}}</i></span>
                        <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="addControl">
                        <add-control :food="food" @add="addCar"></add-control>
                    </div>
                    <transition name="fade">
                        <i @click.stop.prevent="addFood" v-show="!food.count || food.count == 0" class="buy">加入购物车</i>
                    </transition>
                </div>
                <div class="desc">
                    <h5 class="detail-tit">商品介绍</h5>
                    <p>{{food.info}}</p>
                </div>
                <!-- 评论列表 -->
                <div class="rating">
                    <h5 class="detail-tit">商品评价</h5>
                    <rating-select :only-content="onlyContent" :selectType="selectType" :ratings="food.ratings" @showCont="toggleCont" @select="toggleType"></rating-select>
                </div>

                <div class="rating-list">
                    <ul>
                        <li v-if="needShow(rate.rateType, rate.text)" v-for="(rate, index) in food.ratings" key="index">
                            <div class="rate-time">{{rate.rateTime | formatDate}}</div>
                            <div class="rating-cont">
                                <span v-if="rate.rateType == 0" class="icon-assist acc">&#xe6a0;</span>
                                <span v-else class="icon-assist ref">&#xe600;</span>
                                <p>{{rate.text}}</p>
                            </div>
                            <div class="user-info">
                                <span class="username">{{rate.username}}</span>
                                <img class="user-icon" alt="" :src="rate.avatar">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll';
    import AddControl from '../addcontrol/add.vue';
    import Vue from 'vue';
    import RatingSelect from '../ratingselect/ratingselect.vue';
    import {formatDate} from '../../assets/js/date.js'

    export default {
        components : {
            'add-control' : AddControl,
            'rating-select' : RatingSelect
        },
        filters : {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        },
        props : {
            food : {
                type : Object
            }
        },
        data() {
            return {
                foodShow : false,
                onlyContent : true,
                selectType : -1
            }
        },
        methods : {
            show() {
                this.foodShow = true;
                this.selectType = -1;
                this.onlyContent = true;
                this.$nextTick(() => {
                    if(!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click : true
                        })
                    }else {
                        this.scroll.refresh();
                    }
                })
            },
            addCar(el) {
                this.$emit('add', el);
            },
            addFood(el) {
                this.$emit('add', el);
                Vue.set(this.food, 'count', 1)
            },
            toggleCont() {
                // 只显示有内容评价
                this.onlyContent = !this.onlyContent
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            },
            toggleType(type) {
                // 按类型显示评价
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            },
            needShow(rateType, text) {
                if(this.onlyContent && !text) {
                    // 只显示有内容
                    return false;
                }
                if(this.selectType == -1) {
                    return true;
                }else {
                    return rateType == this.selectType
                }

            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .food-detail {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(1334px - 96px);
        background: #f3f5f7;
        transition: .3s all linear;
        &.slide-right-enter-active,
        &.slide-right-leave-active {
            transform: translate3d(0,0,0);
        }
        &.slide-right-enter,
        &.slide-right-leave-active {
            transform: translate3d(100%,0,0);
        }
        .detail-tit {
            font-size: px2rem(28px);
        }
        .return {
            position: absolute;
            left: px2rem(14px);
            top: px2rem(20px);
            color: #fff;
            .icon-back {
                font-family: 'iconfont'!important;
            }
        }
        .cover {
            position: relative;
            width: 100%;
            height: px2rem(750px);
            img {
                width: 100%;
                height: 100%;
            }
        }
        .rating {
            padding: px2rem(36px) px2rem(36px) 0;
            background: #fff;
            border-top: 2px solid rgba(7,17,27,.1);
            border-bottom: 2px solid rgba(7,17,27,.1);
            margin-top: px2rem(32px);

        }
        .infos {
            position: relative;
            background: #fff;
            padding: px2rem(36px);
            border-bottom: 2px solid rgba(7,17,27,.1);
            margin-bottom: px2rem(32px);
            .name {
                font-size: px2rem(28px);
                font-weight: 700;
                line-height: px2rem(28px);
                margin-bottom: px2rem(16px);
            }
            .subs {
                font-size: px2rem(20px);
                color: rgb(147,153,159);
                display: flex;
                line-height: px2rem(20px);
                margin-bottom: px2rem(36px);
                .sell {
                    margin-right: px2rem(24px);
                }
            }
            .price {
                font-size: px2rem(20px);
                color: rgb(240,20,20);
                display: flex;
                line-height: px2rem(48px);
                .big {
                    font-size: px2rem(28px);
                    font-weight: 700;
                }
                .old-price {
                    color: rgb(147,153,159);
                    text-decoration: line-through;
                    margin-left: px2rem(24px);
                }
            }
            .addControl {
                position: absolute;
                right: px2rem(36px);
                bottom: px2rem(36px);
                z-index: 20;
            }
            .buy {
                width: px2rem(148px);
                height: px2rem(48px);
                background: rgb(0,160,200);
                border-radius: px2rem(24px);
                cursor: pointer;
                z-index: 999;
                position: absolute;
                right: px2rem(36px);
                bottom: px2rem(36px);
                color: #fff;
                font-size: px2rem(20px);
                line-height: px2rem(48px);
                text-align: center;
            }
            .fade-enter-active,
            .fade-leave-active {
                transition: .3s opacity;
            }
            .fade-enter,
            .fade-leave-active {
                opacity: 0;
            }
        }
        .desc {
            border-top: 2px solid rgba(7,17,27,.1);
            border-bottom: 2px solid rgba(7,17,27,.1);
            background: #fff;
            padding: px2rem(36px);
            p {
                padding-left: px2rem(16px);
                font-size: px2rem(24px);
                color: #4d555d;
                line-height: px2rem(48px);
                font-weight: 200;
            }
        }
        .rating-list {
            padding: 0 px2rem(26px);
            background: #fff;
            li {
                position: relative;
                padding: px2rem(32px) 0;
                border-bottom: 1px solid rgba(7,17,27,.1);
                .rate-time {
                    font-size: px2rem(20px);
                    color: rgb(147,153,159);
                    line-height: px2rem(24px);
                    margin-bottom: px2rem(12px);
                }
                .rating-cont {
                    display: flex;
                    .icon-assist {
                        font-family: 'iconfont'!important;
                        font-size: px2rem(24px);
                        color: rgb(0,160,220);
                        line-height: px2rem(48px);
                        margin-right: px2rem(8px);
                        &.ref {
                            color: rgb(147,153,159);
                        }
                    }
                    p {
                        font-size: px2rem(24px);
                        line-height: px2rem(48px);
                    }
                }
                .user-info {
                    position: absolute;
                    right: 0;
                    top: px2rem(32px);
                    display: flex;
                    font-size: px2rem(20px);
                    color: rgb(147,153,159);
                    line-height: px2rem(24px);
                    img {
                        width: px2rem(24px);
                        height: px2rem(24px);
                        border-radius: 50%;
                        margin-left: px2rem(12px);
                    }
                }
            }
        }
    }
</style>
