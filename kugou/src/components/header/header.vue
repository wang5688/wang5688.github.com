<template lang="html">
    <div class="header">
        <div class="logo">
            <h1>kugou</h1>
        </div>
        <div class="download">
            <a href="javascript:;">下载酷狗</a>
        </div>
        <div class="search-btn">
            <a href="javascript:;"></a>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .header {
        width: 100%;
        height: p2m(102px - 20px);
        background: $color_1;
        display: flex;
        padding-top: p2m(20px);
        .logo {
            width: p2m(270px);
            height: p2m(64px);
            margin-left: p2m(20px);
            h1 {
                width: 100%;
                height: 100%;
                @include bg-image('./logo.png');
                text-indent: -999em;
            }
        }
        .download {
            width: p2m(172px);
            height: p2m(58px);
            border: 2px solid #fff;
            border-radius: 6px;
            text-align: center;
            margin-left: p2m(28px);
            a {
                font-size: p2m(26px);
                color: #fff;
                line-height: p2m(58px);
            }
        }
    }
</style>
