import axios from 'axios'
import {commonParams} from '@/api/config.js'

export function getLyric(mid) {
	const url = 'api/getLyric'
	const data = Object.assign({},commonParams,{
		nobase64:1,
		musicid:mid,
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		format:'jsonp',
		platform:'yqq',
		needNewCode:0
	})
	return axios.get(url,{
		params:data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}