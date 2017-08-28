<template lang="html">
    <div>
        <div class="banner swiper-container">
            <div class="banner-wrapper swiper-wrapper" ref="wrapper">
                <ul class="pic-list swiper-slide">
                    <li v-for="(pic, index) in pics" :key="index">
                        <img :src="pic" alt="">
                    </li>
                </ul>
            </div>
            <ol class="btns swiper-pagination" ref="pagination">
                <li v-for="(pic, index) in pics"></li>
            </ol>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                pics : [
                    'http://m.kugou.com/v3/static/images/index/banner.jpg',
                    'http://imge.kugou.com/mobilebanner/20170608/20170608185154404511.jpg',
                    'http://imge.kugou.com/mobilebanner/20170612/20170612184555101861.jpg',
                    'http://imge.kugou.com/mobilebanner/20170614/20170614170257193761.jpg',
                    'http://imge.kugou.com/mobilebanner/20170614/20170614190755709956.jpg'
                ]
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .banner {
        position: relative;
        width: 100%;
        overflow: hidden;
        .banner-wrapper {
            position: relative;
            height: p2m(286px);
            .pic-list {
                display: flex;

                li {
                    height: p2m(286px);
                    img {
                        height: 100%;
                    }
                }

            }
        }
        .btns {
            position: absolute;
            left: 0;
            bottom: 0;
            li {
                width: p2m(24px);
                height: p2m(24px);
                background: rgba(255,255,255,.6);
                border-radius: 50%;
            }
        }
    }
</style>
