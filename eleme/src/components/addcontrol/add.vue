<template lang="html">
    <div class="addcontrol">
        <transition name="move">
            <div class="add-decrease" @click.stop.prevent="removeFood" v-show="food.count > 0">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="add-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="add-btn icon-add_circle" @click.stop.prevent="addCar($event)"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapGetters } from 'vuex'

    export default {
        props : {
            food : {
                type : Object
            }
        },
        methods : {
            addCar(e) {
                if(!this.food.count) {
                    Vue.set(this.food, 'count', 1)
                }else {
                    this.food.count++
                }
                this.$emit('add', e.target);
            },
            removeFood() {
                if(this.food.count) {
                    this.food.count--
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .addcontrol {
        position: relative;
        line-height: px2rem(48px);
        display: flex;
        justify-content: space-between;
        .icon-add_circle {
            width: px2rem(40px);
            height: px2rem(40px);
            background: url(./add_circle.png) no-repeat center center;
            background-size: 100%;
            display: inline-block;
            cursor: pointer;
        }
        .add-count {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            display: inline-block;
            text-align: center;
            font-size: px2rem(20px);
            color: rgb(147,153,159);
            line-height: px2rem(40px);
        }
        .add-decrease {
            width: px2rem(40px);
            height: px2rem(40px);
            display: inline-block;
            transition: .4s all linear;
            margin-right: px2rem(48px);
            &.move-enter-active{
                opacity: 1;
                transform: translate3d(0,0,0);
            }
            .inner {
                width: px2rem(40px);
                height: px2rem(40px);
                background: url(./remove_circle.png) no-repeat center center;
                background-size: 100%;
                display: inline-block;
                transition: .4s all linear;
                transform: rotate(0);
            }
            &.move-enter,
            &.move-leave-active {
                opacity: 0;
                transform: translateX(px2rem(48px));
                .inner {
                    transform: rotate(180deg);
                }
            }
        }


    }
</style>
