import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
    state : {
        // 播放器控制
        audioShow : true,
        audio : {
            songUrl : '',
            imgUrl : 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
            songName : '',
            singer : '',
            currentLength : 0,
            songLength : 0,
            currentFlag : false
        },
        audioLoadding : false,
        isPlay : false,
        // 播放器详情
        detailPlayer : false,
        // 播放列表
        listenCount : 0,
        listInfo : {
            songList : [],
            songIndex : 0
        }
    },
    getters : {
        audio : state => state.audio,
        detailPlayer : state => state.detailPlayer,
        isPlay : state => state.isPlay,
        audioShow : state => state.audioShow,
        audioLoadding : state => state.audioLoadding
    },
    mutations : {
        setAudio(state, audio) {
            // 首次进入不打开播放器
            if(!state.listenCount) {
                state.audioShow = false
            }
            state.listenCount++
            state.audio = {...(state.audio), ...audio}
        },
        setLrc(state, lrc) {
            state.audio = {...(state.audio), lrc}
        },
        setCurrentTime(state, time) {
            state.audio.currentLength = time
        },
        setCurrent(state, flag) {
            state.audio.currentFlag = flag
        },
        toggleAudioLoading(state, flag) {
            state.audioLoadding = flag
        },
        isPlay(state, flag) {
            state.isPlay = flag
        },
        showDetailPlayer(state, flag) {
            state.detailPlayer = flag
        }
    },
    actions : {
        getSong({commit, state}, hash) {
            commit('toggleAudioLoading', true)
            // 获取歌曲信息
            Vue.http.get(`http://cs003.m2828.com/apis/getKugouSong.php?hash=${hash}`).then((res) => {
                res = res.body
                // console.log(res)
                var songUrl = res.url,
                    imgUrl = res.imgUrl.split('{size}').join('100'),
                    songName = res.songName,
                    singer = res.singerName,
                    currentLength = 0,
                    songLength = res.timeLength,
                    audio = {songUrl, imgUrl, songName, singer, songLength, currentLength};
                state.isPlay = true
                commit('setAudio', audio)
                commit('toggleAudioLoading', false)
            })
        },
        getLrc({commit, state}, hash) {
            Vue.http.get(`http://cs003.m2828.com/apis/getLrc.php?hash=${hash}`).then((res) => {
                commit('setLrc', res.body)
            })
        }
    }
})

export default store
