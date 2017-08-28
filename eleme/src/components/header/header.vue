<template>
    <div class="header" :style="{ backgroundImage : 'url('+seller.avatar+')'}">
        <div class="header-wrap">
            <div class="mask"></div>
            <div class="store-info">
                <div class="s-icon" :style="{ backgroundImage : 'url('+seller.avatar+')' }"></div>
                <div class="s-info color-1">
                    <div class="s-name color-1">{{seller.name}}</div>
                    <div class="s-subs color-1">{{seller.description}}/{{seller.deliveryTime}}分钟送到</div>
                    <div class="prefer color-1">{{seller.supports && seller.supports[0].description}}</div>
                </div>
            </div>
            <div class="supports color-1" v-if="seller.supports" @click="detailShow = !detailShow">{{seller.supports.length}}个 &gt;</div>
            <div class="bulletin color-1" @click="detailShow = !detailShow">
                <p>{{seller.bulletin}}</p>
            </div>
        </div>

        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper">
                    <div class="detail-main">
                        <div class="d-name color-1">{{seller.name}}</div>
                        <!-- 评分 size - star大小 -->
                        <stars :size="48" :score="seller.score"></stars>
                        <!-- 优惠信息 -->
                        <div class="prefer-info color-1" v-if="seller.supports">
                            <div class="pre-title">
                                <h4>优惠信息</h4>
                            </div>
                            <ul class="prefer-list">
                                <li v-for="(item, index) in seller.supports" :class="'sup-'+item.type" class="icon-sup" key="index">
                                    <p>{{item.description}}</p>
                                </li>
                            </ul>
                        </div>
                        <!-- 商家公告 -->
                        <div class="infos color-1" v-if="seller.infos">
                            <div class="pre-title">
                                <h4>商家公告</h4>
                            </div>
                            <div class="infos-cont">
                                <p v-for="(info, index) in seller.infos" key="index">{{info}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="detail-close" @click="detailShow = false">
                        <i class="icon-close">&#xe602;</i>
                    </div>
                </div>
            </div>
        </transition>
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
                storeInfo : '',
                detailShow : false
            }
        },
        props : ['seller']
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/var.scss';

    .header {
        position: relative;
        width: 100%;
        overflow: hidden;
        .header-wrap {
            height: px2rem(268px);
            background-size: 100% 100%;
        }

        .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: rgba(0,0,0,0.6);
            filter: blur(10px);
        }
        .store-info {
            position: absolute;
            left: px2rem(48px);
            top: px2rem(48px);
            display: -webkit-flex;
            display: flex;
            .s-icon {
                width: px2rem(128px);
                height: px2rem(128px);
                border-radius: px2rem(4px);
                background-size: 100%;
                margin-right: px2rem(32px);
            }
            .s-info {
                .s-name {
                    font-size: px2rem(32px);
                    font-weight: bold;
                    padding-left: px2rem(72px);
                    line-height: px2rem(56px);
                    @include bg-image('brand');
                    background-size: px2rem(60px) px2rem(38px);
                }
                .s-subs {
                    font-size: px2rem(24px);
                    font-weight: 200;
                    line-height: px2rem(40px);
                }
                .prefer {
                    font-size: px2rem(20px);
                    font-weight: 200;
                    line-height: px2rem(40px);
                    padding-left: px2rem(28px);
                    @include bg-image('decrease_2');
                    background-size: px2rem(24px) px2rem(24px);
                }
            }
        }
        .supports {
            position: absolute;
            right: px2rem(24px);
            bottom: px2rem(86px);
            font-size: px2rem(20px);
            font-weight: 200;
            line-height: px2rem(24px);
            background: rgba(0,0,0,.2);
            padding: 0 px2rem(16px);
            height: px2rem(48px);
            line-height: px2rem(48px);
            border-radius: px2rem(24px);
            cursor: pointer;
        }
        .bulletin {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: px2rem(56px);
            background: rgba(0,0,0,.2);
            line-height: px2rem(56px);
            p {
                padding-left: px2rem(52px);
                font-size: px2rem(20px);
                margin-left: px2rem(24px);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                @include bg-image('bulletin');
                background-size: px2rem(44px) px2rem(24px);
            }
        }
        .detail {
            &.fade-enter-active,
            &.fade-leave-active {
                transition: opacity .3s;
            }
            &.fade-enter,
            &.fade-leave-to {
                opacity: 0;
            }
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 10001;
            .detail-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                background: rgba(7,17,27,.8);
                .detail-main {
                    width: 100%;
                    position: absolute;
                    left: 50%;
                    top: px2rem(128px);
                    transform: translateX(-50%);
                }
                .d-name {
                    text-align: center;
                    font-size: px2rem(32px);
                    font-weight: 700;
                    margin-bottom: px2rem(32px);

                }
                .pre-title {
                    h4 {
                        text-align: center;
                        font-size: px2rem(28px);
                        font-weight: 700;
                        display: -webkit-flex;
                        display: flex;
                        margin-bottom: px2rem(48px);
                        &:before {
                            display: block;
                            content: '';
                            width: px2rem(224px);
                            border-top: 2px solid #61676d;
                            box-sizing: border-box;
                            margin-left: px2rem(72px);
                            vertical-align: middle;
                            margin-right: px2rem(24px);
                            margin-top: px2rem(15px);
                        }
                        &:after {
                            display: block;
                            content: '';
                            width: px2rem(224px);
                            border-top: 2px solid #61676d;
                            box-sizing: border-box;
                            margin-left: px2rem(72px);
                            vertical-align: middle;
                            margin-left: px2rem(24px);
                            margin-top: px2rem(15px);
                        }
                    }
                }
                .prefer-info {
                    margin-top: px2rem(56px);
                    margin-bottom: px2rem(56px);
                    .prefer-list {
                        padding-left: px2rem(72px);
                        li {
                            p {
                                font-size: px2rem(24px);
                                font-weight: 200;
                            }
                            margin-left: px2rem(24px);
                            margin-bottom: px2rem(24px);
                            padding-left: px2rem(44px);
                            &.icon-sup {
                                background-position: left center;
                                background-repeat: no-repeat;
                                background-size: px2rem(32px) px2rem(32px);
                            }
                            &.sup-0 {
                                background-image: url(./decrease_2@2x.png);
                            }
                            &.sup-1 {
                                background-image: url(./discount_1@2x.png);
                            }
                            &.sup-3 {
                                background-image: url(./special_2@2x.png);
                            }
                        }
                    }
                }
                .infos {
                    .infos-cont {
                        padding: 0 px2rem(72px + 24px);
                        p {
                            font-size: px2rem(24px);
                            font-weight: 200;
                            line-height: px2rem(48px);
                        }
                    }
                }
                .detail-close {
                    display: block;
                    position: absolute;
                    left: 50%;
                    bottom: px2rem(64px);
                    transform: translate3d(-50%,0,0);
                    cursor: pointer;
                    .icon-close {
                        font-family: 'iconfont'!important;
                        font-size: px2rem(32px);
                        color: rgba(255,255,255,.5);
                    }
                }
            }
        }
    }
</style>
