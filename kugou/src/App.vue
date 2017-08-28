<template lang="html">
    <div>
        <k-header></k-header>
        <div class="main-nav">
            <div class="nav-item">
                <router-link to="/new">新歌</router-link>
            </div>
            <div class="nav-item">
                <router-link to="/rank">排行</router-link>
            </div>
            <div class="nav-item">
                <router-link to="/list">歌单</router-link>
            </div>
            <div class="nav-item">
                <router-link to="/singer">歌手</router-link>
            </div>
            <div class="nav-item">
                <router-link to="/rings">彩铃</router-link>
            </div>
        </div>

        <keep-alive>
            <router-view></router-view>
        </keep-alive>

        <play-panel></play-panel>

        <detail-player></detail-player>
    </div>
</template>

<script>
    import Header from './components/header/header.vue'
    import PlayPanel from './components/controll/play.vue'
    import DetailPlayer from './components/controll/detail_player.vue'
    import { mapGetters } from 'vuex'


    export default {
        components : {
            'k-header' : Header,
            'play-panel' : PlayPanel,
            'detail-player' : DetailPlayer
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/var.scss";

    body {
        background: #fff;
    }
    .main-nav {
        width: 100%;
        height: p2m(86px);
        background: #fff;
        display: flex;
        justify-content: space-around;
        line-height: p2m(86px);
        border-bottom: 3px solid #f4f4f4;
        .nav-item {
            flex: 1;
            text-align: center;
            a {
                display: block;
                width: 100%;
                height: 100%;
                font-size: p2m(30px);
            }
            a.active {
                color: $color_1;
                @include font-w(700);
                border-bottom: p2m(6px) solid $color_1;
                box-sizing: border-box;
            }
        }
    }
</style>
