<template lang="html">
    <div>
        <div class="rank">
            <ul>
                <li class="rank-item" v-for="(rank, index) in ranks" key="index">
                    <router-link :to="'/rank/info/'+rank.rankid" class="item-link">
                        <div class="icon">
                            <img src="http://imge.kugou.com/mcommon/400/20150717/20150717100030907982.png" alt="" class="icon-rank">
                            <span class="iconfont play-btn">&#xe628;</span>
                        </div>
                        <div class="infos">
                            <h5 class="rank-tit">{{rank.rankname}}</h5>
                            <ul class="rank-top">
                                <li class="top-item" v-for="(top, index) in rank.songinfo" key="index">
                                    <span class="icon-num">{{index+1}}</span>
                                    <div class="top-name">{{top.songname}}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="icon-r iconfont">&#xe619;</div>
                    </router-link>
                </li>
            </ul>
        </div>
        <toast :show="toastShow"></toast>
    </div>
</template>

<script>
    import Toast from '../public/toast.vue'
    import PlayPanel from '../controll/play.vue'

    export default {
        components : {
            toast : Toast
        },
        data() {
            return {
                toastShow : true,
                ranks : []
            }
        },
        created() {
            this.$http.get('/api/rank').then((res) => {
                res = res.body
                if(res.errcode == 0) {
                    this.ranks = res.data.info
                    // console.log(this.ranks)
                    this.toastShow = false;
                }
            })
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";

    .rank {
        padding-left: p2m(36px);
        .rank-item {
            padding: p2m(20px) 0;
            .item-link {
                display: flex;
                position: relative;
            }
            .icon {
                position: relative;
                width: p2m(160px);
                height: p2m(160px);
                border: 1px solid #000;
                margin-right: p2m(26px);
                img {
                    width: 100%;
                    height: 100%;
                }
                .play-btn {
                    position: absolute;
                    right: p2m(6px);
                    bottom: p2m(6px);
                    width: p2m(48px);
                    height: p2m(48px);
                    color: #fff;
                    background: rgba(0,0,0,.3);
                    border-radius: 50%;
                    font-size: p2m(48px);
                }
            }
            .infos {
                flex: 1;
                border-bottom: 1px solid #dbdbdb;
                .rank-tit {
                    font-size: p2m(30px);
                    margin-bottom: p2m(10px);
                }
                .rank-top {
                    width: p2m(430px);
                    .top-item {
                        display: flex;
                        line-height: p2m(24px);
                        margin-bottom: p2m(16px);
                        .icon-num {
                            padding-top: p2m(4px);
                            line-height: p2m(20px);
                            display: inline-block;
                            width: p2m(30px);
                            height: p2m(20px);
                            text-align: center;
                            color: #fff;
                            font-size: p2m(12px);
                            border-radius: p2m(10px);
                            margin-right: p2m(12px);
                        }
                        &:nth-child(1) .icon-num{
                            background: #e80000;
                        }
                        &:nth-child(2) .icon-num{
                            background: #ff7200;
                        }
                        &:nth-child(3) .icon-num{
                            background: #ffae00;
                        }
                        .top-name {
                            font-size: p2m(24px);
                            color: #888;
                            flex: 1;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
            .icon-r {
                position: absolute;
                right: p2m(24px);
                top: 50%;
                color: #81c5f5;
                transform: translateY(-50%);
            }
        }
    }
</style>
