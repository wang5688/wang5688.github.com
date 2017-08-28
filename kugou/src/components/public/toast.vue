<template lang="html">
    <div class="toast" v-if="show">
        <div class="main">
            <div class="icon-fresh"></div>
            <span>加载中...</span>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            show : {
                type : Boolean
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";
    .toast {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
        background: rgba(0, 0, 0, 0.7);
        border-radius: 5px;
        .main {
            text-align: center;
            padding: 20px;
        }
        .icon-fresh {
            margin: 0 auto;
            width: p2m(60px);
            height: p2m(60px);
            border: 4px solid #ccc;
            border-radius: 50%;
            border-bottom: 4px solid rgba(0,0,0,0);
            box-sizing: border-box;
            transform: rotate(0deg);
            animation: fresh .6s linear infinite;
        }
        span {
            font-size: p2m(28px);
            font-weight: 700;
            color: #fff;
        }
        @keyframes fresh {
            0% {
                transform: rotate(0deg);
            }
            50% {
                transform: rotate(180deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>
