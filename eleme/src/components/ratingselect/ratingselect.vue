<template lang="html">
    <div>
        <div class="rating-type">
            <span :class="{'active' : selectType == -1}" @click="select(-1)">{{desc.all}}<i>{{ratings && ratings.length}}</i></span>
            <span :class="{'active' : selectType == 0}" @click="select(0)">{{desc.recom}}<i>{{ratingType.recom}}</i></span>
            <span class="type-tease" :class="{'active' : selectType == 1}" @click="select(1)">{{desc.tease}}<i>{{ratingType.tease}}</i></span>
        </div>
        <div class="show-cont">
            <span class="icon-yes" :class="{'active' : onlyContent}" @click="showCont">&#xe63b;</span>
            <a href="javascript:;">只看有内容的评价</a>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        props : {
            desc : {
                type : Object,
                default() {
                    return {
                        all : '全部',
                        recom : '推荐',
                        tease : '吐槽'
                    }
                }
            },
            onlyContent : {
                type : Boolean
            },
            ratings : {
                type : Array
            },
            selectType : {
                type : Number
            }
        },
        computed : {
            ratingType() {
                let type = {
                    recom : 0,
                    tease : 0
                }
                this.ratings && this.ratings.forEach((rate) => {
                    if(rate.rateType == 0) {
                        type.recom++
                    }else if(rate.rateType == 1) {
                        type.tease++
                    }
                })
                return type;
            }
        },
        methods : {
            showCont() {
                this.$emit('showCont');
            },
            select(type) {
                this.$emit('select',type);
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .rating-type {
        display: flex;
        padding: px2rem(36px) 0;
        border-bottom: 1px solid rgba(7,17,27,.1);
        span {
            font-size: px2rem(24px);
            line-height: px2rem(24px);
            padding: px2rem(16px) px2rem(24px);
            cursor: pointer;
            border-radius: 2px;
            margin-right: px2rem(16px);
            background: rgba(0,160,220,.2);
            color: rgb(77,85,93);
            i {
                font-size: px2rem(16px);
                margin-left: px2rem(6px);
            }
            &.active {
                background: rgb(0,160,220);
                color: #fff;
            }
            &.type-tease {
                background: rgba(77,85,93,.2);
                color: rgb(77,85,93);
                &.active {
                    background: #4d555d;
                    color: #fff;
                }
            }
        }
    }
    .show-cont {
        display: flex;
        padding: px2rem(24px) 0 ;
        .icon-yes {
            font-family: 'iconfont'!important;
            color: rgb(147,153,159);
            font-size: px2rem(48px);
            line-height: px2rem(48px);
            margin-right: px2rem(8px);
            &.active {
                color: #00c850;
            }
        }
        a {
            font-size: px2rem(24px);
            color: rgb(147,153,159);
            line-height: px2rem(48px);
        }
    }    
</style>
