<template lang="html">
    <div class="detail-player" v-show="detailPlayer">
        <k-header></k-header>
        <div class="detail">
            <div class="mask" :style="{backgroundImage : 'url('+audio.imgUrl+')'}"></div>
            <div class="player-wrapper">
                <div class="wrap-head">
                    <span class="return iconfont" @click="close">&#xe60e;</span>
                    <h5 class="m-title">{{audio.songName}}</h5>
                </div>
                <div class="covers">
                    <img :src="audio.imgUrl" alt="">
                </div>
                <div class="lrc">

                </div>
                <div class="play-contrl">
                    <span class="current-time">{{audio.currentLength | time}}</span>
                    <div class="line">
                        <div class="line-bar" @click="rangeChange($event)" ref="line">
                            <span class="current-line" :style="{ width : barPos+'%' }"></span>
                            <span class="bar" :style="{ left : barPos+'%' }"></span>
                        </div>
                    </div>
                    <span class="remain-time">{{audio.songLength - audio.currentLength | time}}</span>
                </div>
                <div class="play-status">
                    <span class="prev iconfont" @click="prev">&#xe602;</span>
                    <span v-if="isPlay" class="play iconfont" @click="play">&#xe682;</span>
                    <span v-else class="play iconfont" @click="play">&#xe62e;</span>
                    <span class="next iconfont" @click="next">&#xe658;</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../header/header.vue'
    import { mapGetters } from 'vuex'

    export default {
        components : {
            'k-header' : Header
        },
        computed : {
            ...mapGetters(['audioShow', 'audio', 'detailPlayer', 'isPlay', 'audioLoadding']),
            barPos() {
                let pos = parseInt(this.audio.currentLength/this.audio.songLength*100) - 5
                return pos
            },
            getLrc() {
                let Lrc = this.audio.lrc && this.audio.lrc.split('/n');
                let result = [];
                Lrc.forEach((lrc, i) => {
                    let time = lrc.match(/\[\d{2}\:\d{2}\.\d{2}\]/g)
                    let text = lrc.split(time)
                    result.push(text)
                })
                return result
            }
        },
        filters : {
            time(value) {
                let min = parseInt(value/60);
                let s = parseInt(value%60);

                function todo(n) {
                    return n < 10 ? '0'+n : ''+n
                }

                return todo(min) + ':' + todo(s)
            }
        },
        methods : {
            rangeChange(e) {
                if(e.target.tagName == 'DIV' || e.target.tagName == 'SPAN') {
                    let $line = $(this.$refs.line);
                    let disX = e.pageX - $line.offset().left
                    let range = disX / $line.offset().width
                    let time = parseInt(range * this.audio.songLength)

                    this.$store.commit('setCurrentTime', time)
                    this.$store.commit('setCurrent', true)
                }
            },
            play() {
                let auEl = document.getElementById('audio');

                if(this.isPlay) {
                    auEl.pause()
                }else {
                    auEl.play()
                }
                this.$store.commit('isPlay', !this.isPlay)
                console.log(this.getLrc)
            },
            prev() {},
            next() {},
            close() {
                this.$store.commit('showDetailPlayer', false)
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .detail-player {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999;
        background: #fff;
    }
    .detail {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            filter: blur(10px);
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .player-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            .wrap-head {
                position: relative;
                height: p2m(88px);
                .return {
                    color: #fff;
                    position: absolute;
                    left: p2m(10px);
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: p2m(50px);
                    cursor: pointer;
                }
                .m-title {
                    width: 100%;
                    text-align: center;
                    color: #fff;
                    font-size: p2m(36px);
                    line-height: p2m(88px);
                }
            }
            .covers {
                width: p2m(376px);
                height: p2m(376px);
                margin: p2m(60px) auto 0;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .play-contrl {
                display: flex;
                justify-content: center;
                color: #fff;
                margin-top: p2m(40px);
                span {
                    font-size: p2m(24px);
                }
                .line {
                    position: relative;
                    width: p2m(548px);
                    margin-left: p2m(26px);
                    margin-right: p2m(4px);
                    .current-line {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 0;
                        height: 100%;
                        background: #26a2ff;
                    }
                    .line-bar {
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: p2m(548px);
                        height: p2m(8px);
                        background: #a8acb1;
                    }
                    .bar {
                        position: absolute;
                        left: 0;
                        top: 0;
                        transform: translateY(p2m(-16px + 4px));
                        width: p2m(32px);
                        height: p2m(32px);
                        background: #fff;
                        border-radius: 50%;

                    }
                }
            }
            .play-status {
                display: flex;
                justify-content: center;
                margin-top: p2m(80px);
                span {
                    color: #fff;
                    font-size: p2m(72px);
                    cursor: pointer;
                    align-self: center;
                    &.play {
                        font-size: p2m(120px);
                        margin: 0 p2m(46px);
                    }
                    &.prev {
                        margin-top: 7px;
                    }
                }
            }
        }
    }
</style>
