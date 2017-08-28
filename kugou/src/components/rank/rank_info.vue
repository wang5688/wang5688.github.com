<template lang="html">
    <div class="rank-list">
        <div class="back">
            <a href="javascript:;" @click="$router.go(-1)" class="iconfont">&#xe60e;</a>
        </div>
        <div class="rank-info">
            <div class="cover"></div>
            <div class="mask">
                <p class="subs">上次更新时间：2017-06-16</p>
            </div>
        </div>
        <div class="list">
            <div class="list-item" v-for="(info, index) in rankInfo" key="index">
                <span class="num">{{index + 1}}</span>
                <div class="item-info">
                    <p class="item-name">{{info.filename}}</p>
                    <span class="icon-play iconfont">&#xe600;</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rankInfo : []
            }
        },
        created() {
            this.getData()
        },
        methods : {
            getData() {
                this.$http.get('/api/rank/'+this.$route.params.id).then((res) => {
                    res = res.body
                    if(res.errcode == 0) {
                        this.rankInfo = res.data.info
                    }
                })
            }
        },
        watch : {
            "$route" : function() {
                if(this.$route.params.id) {
                    this.getData()
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/var.scss";
    .rank-list {
        position: relative;
        .back {
            position: absolute;
            left: p2m(10px);
            top: p2m(20px);
            z-index: 999;
            a {
                color: #fff;
            }
        }
        .list {
            padding: 0 p2m(12px);

            .list-item {
                display: flex;
                padding: p2m(32px) 0;
                line-height: p2m(32px);
                .num {
                    display: inline-block;
                    font-size: p2m(24px);
                    color: #888;
                    padding: 0 p2m(15px);
                    height: p2m(32px);
                    border-radius: .5rem;
                }
                &:nth-child(1) .num{
                    background: #e80000;
                    color: #fff;
                }
                &:nth-child(2) .num{
                    background: #ff7200;
                    color: #fff;
                }
                &:nth-child(3) .num{
                    background: #ffae00;
                    color: #fff;
                }

                .item-info {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    .item-name {
                        font-size: p2m(32px);
                        margin-left: p2m(20px);
                    }
                    .icon-play {
                        color: #bbb;
                        font-weight: 200;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .rank-info {
        position: relative;
        .cover {
            width: 100%;
            height: p2m(400px);
            overflow: hidden;
            background: url(http://imge.kugou.com/mcommon/400/20150331/20150331161100773965.png) no-repeat center center;
        }
        .mask {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: p2m(86px);
            line-height: p2m(86px);
            background: -webkit-linear-gradient(bottom,rgba(0,0,0,.6),rgba(0,0,0,0));
            .subs {
                color: #fff;
                font-size: p2m(15px);
                padding: 0 p2m(20px);
            }
        }
    }

</style>
