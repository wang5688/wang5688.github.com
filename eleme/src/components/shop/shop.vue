<template lang="html">
    <div ref="store">
        <div class="store">
            <div class="store-info">
                <h5 class="name font1">{{seller.name}}</h5>
                <div class="subs">
                    <div class="star">
                        <stars :size="36" :score="seller.score"></stars>
                    </div>
                    <div class="sell-count font3">
                        <span>({{seller.ratingCount}})</span>
                        <span>月售{{seller.sellCount}}单</span>
                    </div>
                </div>
                <div class="collect">
                    <i class="icon-collect">&#xe6b2;</i>
                    <span class="font3">收藏</span>
                </div>
                <div class="deliver">
                    <div class="deliver-item">
                        <h5 class="font3">起送价</h5>
                        <p>{{seller.minPrice}}<i class="font3">元</i></p>
                    </div>
                    <div class="deliver-item">
                        <h5 class="font3">商家配送</h5>
                        <p>{{seller.deliveryPrice}}<i class="font3">元</i></p>
                    </div>
                    <div class="deliver-item">
                        <h5 class="font3">平均配送时间</h5>
                        <p>{{seller.deliveryTime}}<i class="font3">分钟</i></p>
                    </div>
                </div>
            </div>

            <div class="bulletin">
                <h5 class="tit font1">公告与活动</h5>
                <p class="notice font2">{{seller.bulletin}}</p>
                <div class="support">
                    <p class="font2" v-for="(sup, index) in seller.supports" key="index">
                        <span class="support-icon" :class="'type-'+sup.type"></span>{{sup.description}}</p>
                </div>
            </div>

            <div class="lives">
                <h5 class="tit font1">商家实景</h5>
                <div class="pics">
                    <div class="pic-wrapper clearix" ref="picLen">
                        <div class="pic-item fl" v-for="(pic, index) in seller.pics" key="index">
                            <img :src="pic" alt="">
                        </div>
                    </div>
                </div>
            </div>

            <div class="store-infos">
                <h5 class="tit font1">商家信息</h5>
            </div>
        </div>
    </div>
</template>

<script>
    import Star from '../stars/star.vue';

    export default {
        components : {
            stars : Star
        },
        data() {
            return {
                seller : {}
            }
        },
        created() {
            this.$http.get('/api/seller').then((res) => {
                res = res.body
                if(res.errno == 0) {
                    this.seller = res.data

                    this.$refs.picLen.style.width = this.seller.pics.length * (252/46.875) - (12/46.875) + 'rem'
                }
            })
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .store {
        background: #f3f5f7;
        .store-info {
            padding: px2rem(36px);
            position: relative;
            margin-bottom: px2rem(32px);
            @include border-c(2px,bottom);
            background: #fff;
            .subs {
                margin: px2rem(16px) px2rem(16px) px2rem(36px) 0;
                display: flex;
                .star {
                    .stars {
                        justify-content: flex-start;
                    }
                }
                .sell-count {
                    line-height: normal;
                    color: rgb(77,85,93);
                    margin-left: px2rem(16px);
                    span:nth-child(2) {
                        margin-left: px2rem(24px);
                    }
                }
            }
            .collect {
                position: absolute;
                right: px2rem(36px);
                top: px2rem(30px);
                text-align: center;
                .icon-collect {
                    font-family: 'iconfont';
                    font-size: px2rem(48px);
                    color: #D4D6DA;
                    line-height: px2rem(48px);
                    &.active {
                        color: #f01414;
                    }
                }
                span {
                    display: block;
                }
            }
            .deliver {
                @include border-c(1px,top);
                padding-top: px2rem(36px);
                display: flex;
                justify-content: space-around;
                .deliver-item {
                    text-align: center;
                    @include border-c(1px,right);
                    flex: 1;
                    &:last-child {
                        border: none;
                    }
                    h5 {
                        color: rgb(147,153,159);
                        margin-bottom: px2rem(8px);
                    }
                    p {
                        font-weight: 200;
                    }
                }
            }
        }
        .bulletin {
            background: #fff;
            padding: px2rem(36px);
            padding-bottom: 0;
            @include border-c(2px,top);
            @include border-c(2px,bottom);
            margin-bottom: px2rem(32px);
            .notice {
                margin-top: px2rem(16px);
                line-height: px2rem(48px);
                color: rgb(240,20,20);
                margin-left: px2rem(24px);
            }
            .support {
                margin-top: px2rem(32px);
                margin-left: px2rem(24px);
                p {
                    padding: px2rem(32px) px2rem(24px);
                    @include border-c(1px,top);
                    font-weight: 200;
                    line-height: px2rem(32px);
                    display: flex;
                    .support-icon {
                        display: inline-block;
                        width: px2rem(32px);
                        height: px2rem(32px);
                        margin-right: px2rem(12px);
                        background-position: 0 0;
                        background-size: 100%!important;
                        &.type-0 {
                            @include bg-image('decrease_4');
                        }
                        &.type-1 {
                            @include bg-image('discount_4');
                        }
                        &.type-3 {
                            @include bg-image('special_4');
                        }
                    }
                }
            }
        }
        .lives {
            background: #fff;
            @include border-c(2px,top);
            @include border-c(2px,bottom);
            padding: px2rem(36px);
            margin-bottom: px2rem(32px);
            .pics {
                overflow: hidden;
                margin-top: px2rem(24px);
                .pic-wrapper {
                    height: px2rem(180px);
                    .pic-item {
                        width: px2rem(240px);
                        height: px2rem(180px);
                        margin-right: px2rem(12px);
                        &:last-child{
                            margin: 0;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

            }
        }
        .store-infos {
            background: #fff;
            @include border-c(2px,top);
            padding: px2rem(36px);
        }
    }
</style>
