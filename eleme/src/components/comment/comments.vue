<template lang="html">
    <div class="comment" ref="wrapper">
        <div class="comment-wrapper">
            <div class="grade">
                <div class="score">
                    <span class="scores">{{seller.score}}</span>
                    <p>综合评分</p>
                    <p class="rankRate">高于周边商家{{seller.rankRate}}%</p>
                </div>
                <div class="service">
                    <div class="s-score">
                        <span>服务态度</span>
                        <div class="star">
                            <star :size="36" :score="seller.serviceScore"></star>
                        </div>
                        <span class="serviceScore">{{seller.serviceScore}}</span>
                    </div>
                    <div class="s-score">
                        <span>商品评分</span>
                        <div class="star">
                            <star :size="36" :score="seller.foodScore"></star>
                        </div>
                        <span class="serviceScore">{{seller.foodScore}}</span>
                    </div>
                    <p class="deliveryTime">送达时间<i>{{seller.deliveryTime}}分钟</i></p>
                </div>
            </div>

            <div class="comment-list">
                <div class="rate-select">
                    <rating-select :onlyContent="onlyContent" :selectType="selectType" :ratings="ratings" :desc="rateDesc" @showCont="toggleCont" @select="select"></rating-select>
                </div>
                <div class="comments">
                    <ul>
                        <li v-show="needShow(rate.rateType, rate.text)" class="rate-item" v-for="(rate, index) in ratings" key="index">
                            <div class="user-info">
                                <div class="user-icon">
                                    <img :src="rate.avatar" alt="">
                                </div>
                                <div class="user-name">
                                    <p>{{rate.username}}</p>
                                    <div class="score">
                                        <div class="star">
                                            <star :size="24" :score="rate.score"></star>
                                        </div>
                                        <span class="deliveryTime">{{rate.deliveryTime}}分钟送达</span>
                                    </div>
                                </div>
                            </div>
                            <div class="rate-content">
                                <p>{{rate.text}}</p>
                            </div>
                            <div class="rate-recommend">
                                <span v-if="rate.rateType == 0" class="icon-assist acc">&#xe6a0;</span>
                                <span v-else class="icon-assist ref">&#xe600;</span>
                                <div class="tips">
                                    <span v-for="(recom, index) in rate.recommend" key="index">{{recom}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RatingSelect from '../ratingselect/ratingselect.vue';
    import Star from '../stars/star.vue';
    import BScroll from 'better-scroll';

    export default {
        components : {
            'rating-select' : RatingSelect,
            'star' : Star
        },
        data() {
            return {
                ratings : [],
                seller : [],
                selectType : -1,
                onlyContent : true,
                rateDesc : {
                    all : '全部',
                    recom : '满意',
                    tease : '不满意'
                }
            }
        },
        created() {
            this.$http.get('/api/elm').then((res) => {
                res = res.body
                console.log(res)
                if(res.errno == 0) {
                    this.ratings = res.data.ratings
                    this.seller = res.data.seller
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.wrapper, {
                            click : true
                        })
                    })
                }
            })
        },
        methods : {
            toggleCont() {
                this.onlyContent = !this.onlyContent
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            },
            select(type) {
                this.selectType = type
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            },
            needShow(type, text) {
                if(this.onlyContent && !text) {
                    return false;
                }
                if(this.selectType == -1) {
                    return true
                }else {
                    return type == this.selectType
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .comment {
        background: #f3f5f7;
        height: px2rem(1334px - 80px - 268px);
        overflow: hidden;
        .grade {
            background: #fff;
            width: 100%;
            padding: px2rem(36px) 0;
            border-bottom: 2px solid rgba(7,17,27,.1);
            display: flex;
            margin-bottom: px2rem(32px);
            .score {
                text-align: center;
                border-right: 1px solid rgba(7,17,27,.1);
                padding: 0 px2rem(48px);
                .scores {
                    font-size: px2rem(48px);
                    color: rgb(255,153,0);
                    line-height: px2rem(56px);
                }
                p {
                    font-size: px2rem(24px);
                    color: rgb(7,17,27);
                    line-height: px2rem(24px);
                    margin-top: px2rem(12px);

                }
                .rankRate {
                    font-size: px2rem(20px);
                    color: #93999f;
                    line-height: px2rem(20px);
                    margin-top: px2rem(16px);
                    margin-bottom: px2rem(12px);
                }
            }
            .service {
                padding-left: px2rem(48px);
                .s-score {
                    line-height: px2rem(36px);
                    margin-bottom: px2rem(16px);
                    vertical-align: baseline;
                    display: flex;
                    span {
                        display: inline-block;
                        font-size: px2rem(24px);
                        line-height: px2rem(36px);
                    }
                    .serviceScore {
                        font-size: px2rem(24px);
                        color: rgb(255,153,0);
                        line-height: px2rem(36px);
                        display: inline-block;
                    }
                    .star {
                        display: inline-block;
                        margin: 0 px2rem(12px) 0 px2rem(24px);
                    }
                    .star-item {
                        margin-right: px2rem(12px)!important;
                    }
                }
                .deliveryTime {
                    font-size: px2rem(24px);
                    line-height: px2rem(36px);
                    i {
                        color: rgb(147,153,159);
                        margin-left: px2rem(26px);
                    }
                }
            }
        }

        .comment-list {
            background: #fff;
            border-top: 2px solid rgba(7,17,27,.1);
            .rate-select {
                padding: 0 px2rem(36px);
            }
            .comments {
                padding: 0 px2rem(36px);
                border-top: 1px solid rgba(7,17,27,.1);
                .rate-item {
                    padding: px2rem(36px) 0;
                    border-bottom: 1px solid rgba(7,17,27,.1);
                    .user-info {
                        display: flex;
                        .user-icon {
                            width: px2rem(56px);
                            height: px2rem(56px);
                            border-radius: 50%;
                            overflow: hidden;
                            margin-right: px2rem(24px);
                            img {
                                width: 100%;
                                height: 100%；
                            }
                        }
                        .user-name {
                            font-size: px2rem(20px);
                            line-height: px2rem(24px);
                            .score {
                                display: flex;
                                    margin: px2rem(8px) 0 px2rem(12px);
                                .star {
                                    display: inline-block;
                                    margin-top: 1px;
                                    margin-right: px2rem(12px);
                                    .star-item {
                                        margin-right: px2rem(6px)!important;
                                    }
                                }
                                .deliveryTime {
                                    font-size: px2rem(20px);
                                    font-weight: 200;
                                    color: rgb(147,153,159);
                                    line-height: px2rem(24px);
                                    display: inline-block;
                                }
                            }
                        }
                    }
                    .rate-content {
                        margin-left: px2rem(80px);
                        font-size: px2rem(24px);
                        line-height: px2rem(36px);
                        margin-bottom: px2rem(16px);
                    }
                    .rate-recommend {
                        display: flex;
                        margin-left: px2rem(80px);
                        .icon-assist {
                            font-family: 'iconfont'!important;
                            font-size: px2rem(24px);
                            line-height: px2rem(32px);
                            vertical-align: middle;
                            margin-right: px2rem(16px);
                            margin-top: 4px;
                            &.acc {
                                color: rgb(0,160,220);
                            }
                            &.ref {
                                color: rgb(183,187,191);
                            }
                        }
                        .tips {
                            line-height: px2rem(32px);
                            span {
                                font-size: px2rem(18px);
                                color: rgb(147,153,159);
                                border: 1px solid rgba(7,17,27,.1);
                                border-radius: 2px;
                                background: #fff;
                                margin-right: px2rem(16px);
                                padding: 0 px2rem(12px);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
