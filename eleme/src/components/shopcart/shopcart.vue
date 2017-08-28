<template lang="html">
    <div>
        <div class="shopcart">
            <div class="shop-car" @click="show">
                <div class="cover">
                    <span class="icon-shopcar">&#xe641;</span>
                    <i class="num" v-if="selectFood.length > 0">{{totalFoods}}</i>
                </div>
            </div>
            <div class="total-price">
                <p>￥{{totalPrice}}</p>
            </div>
            <div class="delivery" @click="show">
                <p>另需配送费￥{{seller.deliveryPrice}}元</p>
            </div>
            <div class="min-price">
                <div v-if="totalPrice < seller.minPrice">
                    <p v-if="totalPrice > 0">还差￥{{seller.minPrice - totalPrice}}元起送</p>
                    <p v-else>￥{{seller.minPrice}}起送</p>
                </div>
                <p v-else class="settlement">去结算</p>
            </div>
            <!-- 下落小球 -->
            <div class="ball-container">
                <div v-for="ball in balls">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                        <div class="ball" v-show="ball.show">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <transition name="slide-up">
            <div class="car-detail" v-show="detailShow">
                <div class="mask" @click="detailShow = false"></div>
                <div class="detail-wrapper">
                    <div class="car-header color-2">
                        <h5>购物车</h5>
                        <a href="javascript:;" class="clear" @click="clear">清空</a>
                    </div>
                    <ul class="food-list">
                        <li class="color-2" v-for="(food, index) in selectFood" key="index">
                            <div class="name">{{food.name}}</div>
                            <div class="info">
                                <div class="price">￥{{food.price}}</i></div>
                                <div class="addControl">
                                    <add-control :food="food"></add-control>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import AddControl from '../addcontrol/add.vue'

    export default {
        components : {
            'add-control' : AddControl
        },
        props : {
            seller : {
                type : ''
            },
            selectFood : {
                type : Array
            }
        },
        data() {
            return {
                detailShow : false,
                balls : [
                    {
                        show : false
                    },
                    {
                        show : false
                    },
                    {
                        show : false
                    },
                    {
                        show : false
                    },
                    {
                        show : false
                    }
                ],
                dropBalls : [],
                fold : true
            }
        },
        computed : {
            totalPrice() {
                let price = 0;
                this.selectFood && this.selectFood.forEach((food) => {
                    price += food.price * food.count
                })
                return price;
            },
            totalFoods() {
                let total = 0;
                this.selectFood && this.selectFood.forEach((food) => {
                    total += food.count
                })
                return total;
            }
        },
        methods : {
            show() {
                if(!this.selectFood.length) return;
                this.detailShow = !this.detailShow
            },
            clear() {
                this.selectFood.forEach((food) => {
                    food.count = 0
                })
                this.detailShow = false
            },
            drop(el) {
                for(let i=0; i<this.balls.length; i++) {
                    let ball = this.balls[i]
                    if(!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return
                    }
                }
            },
            beforeDrop(el) {
                let count = this.balls.length;
                while (count--) {
                  let ball = this.balls[count];
                  if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                  }
                }
            },
            dropping(el, done) {
                /* eslint-disable no-unused-vars */
                let rf = el.offsetHeight;
                this.$nextTick(() => {
                  el.style.webkitTransform = 'translate3d(0,0,0)';
                  el.style.transform = 'translate3d(0,0,0)';
                  let inner = el.getElementsByClassName('inner-hook')[0];
                  inner.style.webkitTransform = 'translate3d(0,0,0)';
                  inner.style.transform = 'translate3d(0,0,0)';
                  el.addEventListener('transitionend', done);
                });
            },
            afterDrop(el) {
                let ball = this.dropBalls.shift();
                if (ball) {
                  ball.show = false;
                  el.style.display = 'none';
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .shopcart {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: px2rem(96px);
        background: #141d27;
        display: flex;
        display: -webkit-flex;
        z-index: 9999;
        .shop-car {
            position: absolute;
            left: px2rem(24px);
            bottom: px2rem(16px);
            width: px2rem(112px);
            height: px2rem(112px);
            border-radius: 50%;
            background: #141d27;
            .cover {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate3d(-50%,-50%,0);
                width: px2rem(88px);
                height: px2rem(88px);
                border-radius: 50%;
                background: #2b343c;
                text-align: center;
                .icon-shopcar {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate3d(-50%,-50%,0);
                    font-family: 'iconfont'!important;
                    color: #80858a;
                    font-size: px2rem(50px);
                    text-align: center;
                }
                &.active {
                    background: #00a0dc;
                    .icon-shopcar {
                        color: #fff;
                    }
                }
                .num {
                    position: absolute;
                    right: px2rem(-12px);
                    top: px2rem(-12px);
                    height: px2rem(32px);
                    min-width: px2rem(20px);
                    color: #fff;
                    font-size: px2rem(18px);
                    font-weight: 700;
                    background: #f01414;
                    padding: 0 px2rem(14px);
                    border-radius: px2rem(16px);

                }
            }
        }
        .total-price {
            margin-left: px2rem(160px);
            color: rgba(255,255,255,.4);
            font-size: px2rem(32px);
            font-weight: 700;
            line-height: px2rem(48px);
            margin-top: px2rem(20px);
            border-right: 1px solid rgba(255,255,255,.1);
            margin-right: px2rem(24px);
            padding-right: px2rem(24px);
            margin-bottom: px2rem(24px);
            &.active {
                color: #fff;
            }
        }
        .delivery {
            font-size: px2rem(24px);
            color: rgba(255,255,255,.4);
            font-weight: 700;
            line-height: px2rem(48px);
            line-height: px2rem(96px);
        }
        .min-price {
            position: absolute;
            right: 0;
            top: 0;
            width: px2rem(210px);
            height: 100%;
            background: #2b333b;
            color: rgba(255,255,255,.4);
            font-size: px2rem(24px);
            text-align: center;
            line-height: px2rem(96px);
        }
        .settlement {
            position: absolute;
            right: 0;
            top: 0;
            width: px2rem(210px);
            height: 100%;
            background: #00b43c;
            color: #fff;
            font-size: px2rem(24px);
            text-align: center;
            line-height: px2rem(96px);
        }
        .ball-container{
            .ball {
                position: fixed;
                left: px2rem(64px);
                bottom: px2rem(44px);
                z-index: 200;
                transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
                .inner {
                    width: px2rem(32px);
                    height: px2rem(32px);
                    border-radius: 50%;
                    background: rgb(0, 160, 220);
                    transition: all .4s linear;
                }
            }
        }
    }

    .car-detail {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9000;
        .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: rgba(7,17,27,.6);
            transition: .3s all linear;
        }
        .detail-wrapper {
            position: absolute;
            left: 0;
            bottom: px2rem(96px);
            width: 100%;
            min-height: px2rem(80px);
            padding-bottom: px2rem(45px);
            background: #fff;
            transition: .3s all linear;
        }
        &.slide-up-enter-active,
        &.slide-up-leave-active {
            transition: .5s all linear;
            .mask {
                opacity: 1;
            }
            .detail-wrapper {
                transform: translate3d(0,0,0);
            }
        }
        &.slide-up-enter,
        &.slide-up-leave-active {
            .mask {
                opacity: 0;
            }
            .detail-wrapper {
                transform: translate3d(0,100%,0);
            }
        }
        .car-header {
            display: flex;
            justify-content: space-between;
            height: px2rem(80px);
            border-bottom: 2px solid rgba(7,17,27,.1);
            padding-left: px2rem(36px);
            line-height: px2rem(80px);
            background: #f3f5f7;
            h5 {
                font-size: px2rem(28px);
            }
            .clear {
                font-size: px2rem(24px);
                color: rgb(0,160,220);
                line-height: px2rem(80px);
                margin-right: px2rem(36px);
            }
        }
        .food-list {
            padding: 0 px2rem(36px);
            background: #fff;
            li {
                display: flex;
                height: px2rem(96px);
                background: #fff;
                border-bottom: 1px solid rgba(7,17,27,.1);
                justify-content: space-between;
                .name {
                    font-size: px2rem(28px);
                    line-height: px2rem(96px);
                }
                .info {
                    display: flex;
                    line-height: px2rem(96px);
                    .price {
                        font-size: px2rem(20px);
                        color: #f01414;
                        margin-right: px2rem(24px);
                        i {
                            font-size: px2rem(28px);
                            font-weight: 700;
                        }
                    }
                    .addControl {
                        margin-top: px2rem(28px);
                    }
                }
            }
            &:last-child {
                border: none;
            }
        }
    }
</style>
