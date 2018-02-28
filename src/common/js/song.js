import {getSongVkey} from '@/api/singer.js'
import {getLyric} from '@/api/song.js'
import {ERR_OK} from '@/api/config.js'
import {Base64} from 'js-base64'
export default class song{
	constructor({id, mid, name, singer, album, duration, image, url}){
		this.id = id
		this.mid = mid
		this.name = name
		this.singer = singer
		this.album = album
		this.duration = duration
		this.image = image
		this.url = url
		
	}
	getLyric() {
		if(this.lyric){
			return Promise.resolve(this.lyric)
		}
		return new Promise((resolve,reject) => {
			getLyric(this.id).then((res) => {
				if(res.retcode === ERR_OK ){
					this.lyric =(res.lyric)
					resolve(this.lyric)
				}else{
					reject('no lyric')
				}
			})
		})
		
	}
}
export function createSong(musicData, vkey) {
	//const vkey = getSongUrl(musicData.songmid,`C400${musicData.songmid}.m4a`)

	return new song({
		id: musicData.songid,
		mid: musicData.songmid,
		name: musicData.songname,
		singer: filterSinger(musicData.singer),
		album: musicData.albumname,
		duration: musicData.interval,
		image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${vkey}&guid=2233492099&uin=0&fromtag=66}`
	})
}
function filterSinger(singer) {
	let ret = []
	if(!singer){
		return ''
	}
	singer.forEach((item) => {
		ret.push(item.name)
	})
	return ret.join('/')
}
/*function getSongUrl(mid,filename) {
	
	return getSongVkey(mid,filename).then((res) => {

		if(res.code === ERR_OK){
			//console.log(res.data.items[0].vkey)
			vKey = res.data.items[0].vkey
		}
		
		
	})
}*/