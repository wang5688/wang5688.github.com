<template lang="html">
    <transition name="slide">
        <div class="play-panel">
            <audio id="audio" :src="audio.songUrl" autoplay @timeupdate="change" @ended="next" @error="next"></audio>
            <div class="main">
                <div class="play-icon" :style="{ backgroundImage : 'url('+audio.imgUrl+')' }" @click="showDetailPlayer" @timeupdatee></div>
                <div class="play-info" @click="showDetailPlayer">
                    <p class="song-name">{{audio.songName}}</p>
                    <p class="auth-name">{{audio.singer}}</p>
                </div>
                <div class="play-btn">
                    <span class="play iconfont" @click="toggleStatus" v-if="isPlay">&#xe772;</span>
                    <span class="play iconfont" @click="toggleStatus" v-else>&#xe651;</span>
                    <span class="next iconfont" @click="next">&#xe601;</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props : {
            panelShow : {
                style : Boolean
            }
        },
        computed : {
            ...mapGetters(['audioShow', 'audio', 'detailPlayer', 'isPlay', 'audioLoadding'])
        },
        methods : {
            showDetailPlayer() {
                // 点击显示详情页
                this.$store.commit('showDetailPlayer', true);
            },
            toggleStatus() {
                // 播放暂停
                let auEl = document.getElementById('audio');

                if(this.isPlay) {
                    auEl.pause();
                }else {
                    auEl.play()
                }
                this.$store.commit('isPlay', !this.isPlay)
            },
            change() {
                let Audio = document.getElementById('audio');

                if(this.audio.currentFlag) {
                    Audio.currentTime = this.audio.currentLength
                    this.$store.commit('setCurrent', false)
                }else {
                    this.$store.commit('setCurrentTime', Audio.currentTime)
                }



            },
            next() {
                // 下一首
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .play-panel {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: p2m(128px);
        z-index: 9999;
        .main {
            position: relative;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.7);
            display: flex;
            .play-icon {
                width: p2m(100px);
                height: p2m(100px);
                border-radius: 2px;
                background: pink;
                margin-left: p2m(14px);
                transform: translateY(p2m(14px));
                margin-right: p2m(20px);
                background-position: 0 0;
                background-repeat: no-repeat;
                background-size: 100%;
            }
            .play-info {
                font-size: p2m(32px);
                color: #fff;
                margin-top: p2m(20px);
                .auth-name {
                    font-size: p2m(28px);
                    color: #c4c4c4;
                }
            }
            .play-btn {
                position: absolute;
                right: p2m(46px);
                top: 50%;
                transform: translateY(-50%);
                .play {
                    margin-right: p2m(60px);
                }
                .iconfont {
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
    }
    .slide-enter-active,
    .slide-leave-active {
        transition: .3s all;
        transform: translateY(-100%);
    }
    .slide-enter,
    .slide-leave-active {
        transform: translateY(0);
    }
</style>
