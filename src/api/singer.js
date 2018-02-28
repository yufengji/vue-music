import axios from 'axios'
import jsonp from '@/common/js/jsonp.js'
import {commonParams,options} from '@/api/config.js'
export function getSinger(){
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
	const data = Object.assign({},commonParams,{
		channel:'singer',
		page:'list',
		key:'all_all_all',
		pagesize:100,
		pagenum:1,
		
		hostUin:0,
		platform:'yqq',
		needNewCode:0,
		g_tk:5381,
		format:'jsonp'
	})
	return jsonp(url,data,options)
}
export function getSingerDetail(singerid) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
	const data = Object.assign({},commonParams,{
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		format:'jsonp',
		platform:'yqq',
		needNewCode:0,
		singermid:singerid,
		order:'listen',
		begin:0,
		num:30,
		songstatus:1
	})
	return jsonp(url,data,options)
}
/*export function getSongVkey(mid, filename) {
	const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
	const data = Object.assign({},commonParams,{
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		format:'json',
		
		platform:'yqq',
		needNewCode:0,
		cid:205361747,
		uin:0,
		songmid:mid,
		filename:filename,
		guid:2233492099
	})
	return jsonp(url, data, options)
}*/
export function getSongVkey(mid,filename) {
	const url = 'api/getSongVeky'
	const data = Object.assign({},commonParams,{
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		format:'json',
		
		platform:'yqq',
		needNewCode:0,
		cid:205361747,
		uin:0,
		songmid:mid,
		filename:filename,
		guid:2233492099
	})
	return axios.get(url,{
		params:data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}