<template lang="html">
    <div class="stars" :class="starType">
        <span v-for="(itemClass, index) in itemClasses" key="index" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_OFF = 'off';
    const CLS_HALF = 'half';

    export default {
        props : {
            size : {
                type : Number
            },
            score : {
                type : Number,
                default : 0
            }
        },
        computed : {
            starType() {
                return 'star-' + this.size;
            },
            itemClasses() {
                let result = [];
                let score = Math.floor(this.score*2)/2;
                let hasDecimal = score & 1 !== 0; // 有小数.5
                let integer = Math.floor(score);
                for(let i=0; i<integer; i++) {
                    result.push(CLS_ON);
                }
                if(hasDecimal) {
                    result.push(CLS_HALF);
                }
                while(result.length < LENGTH) {
                    result.push(CLS_OFF);
                }
                return result;
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/scss/var.scss';

    .stars {
        width: 100%;
        display: flex;
        justify-content: center;
        &.star-48 {
            .star-item {
                width: px2rem(40px);
                height: px2rem(38px);
                margin-right: px2rem(40px);
                background-size: px2rem(40px) px2rem(38px);
                &:last-child {
                    margin-right: 0;
                }
                &.on {
                    @include bg-img('star48_on');
                }
                &.off {
                    @include bg-img('star48_off');
                }
                &.half {
                    @include bg-img('star48_half');
                }
            }
        }
        &.star-36 {
            .star-item {
                width: px2rem(30px);
                height: px2rem(29px);
                margin-right: px2rem(12px);
                background-size: px2rem(30px) px2rem(28px);
                &:last-child {
                    margin-right: 0;
                }
                &.on {
                    @include bg-img('star36_on');
                }
                &.off {
                    @include bg-img('star36_off');
                }
                &.half {
                    @include bg-img('star36_half');
                }
            }
        }
        &.star-24 {
            .star-item {
                width: px2rem(20px);
                height: px2rem(19px);
                margin-right: px2rem(6px);
                background-size: px2rem(20px) px2rem(19px);
                &:last-child {
                    margin-right: 0;
                }
                &.on {
                    @include bg-img('star24_on');
                }
                &.off {
                    @include bg-img('star24_off');
                }
                &.half {
                    @include bg-img('star24_half');
                }
            }
        }
    }
</style>
