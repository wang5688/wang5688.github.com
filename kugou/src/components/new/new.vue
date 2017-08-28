<template lang="html">
    <div>
        <banner></banner>
        <div class="news-list">
            <ul>
                <li v-for="(music, index) in news.info" key="index" class="music-item" @click="play(music.hash)">
                    <p class="name">{{music.filename}}</p>
                    <span class="iconfont icon-play">&#xe600;</span>
                </li>
            </ul>
        </div>
        <toast :show="toastShow"></toast>
    </div>
</template>

<script>
    import Banner from './banner.vue'
    import Toast from '../public/toast.vue'

    export default {
        components : {
            banner : Banner,
            toast : Toast
        },
        data() {
            return {
                news : [],
                toastShow : true
            }
        },
        created() {
            this.$http.get('/api/news').then((res) => {
                res = res.body
                if(res.errcode == 0) {
                    this.news = res.data
                    this.toastShow = false
                }
            })
        },
        methods : {
            play(hash) {
                this.$store.dispatch('getSong', hash)
                this.$store.dispatch('getLrc', hash)
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .news-list {
        padding: 0 p2m(20px);
        .music-item {
            border-bottom: 1px solid #d9d9d9;
            padding: p2m(30px) 0;
            display: flex;
            justify-content: space-between;
            .name {
                font-size: p2m(30px);
                margin-right: p2m(30px);
            }
            .icon-play {
                color: #bbb;
                align-self: center;
            }
        }
    }
</style>
