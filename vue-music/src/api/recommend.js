import jsonp from '@/common/js/jsonp.js'
import {commonParams, options} from '@/api/config.js'
import axios from 'axios'
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    format: 'jsonp'
  })
  return jsonp(url, data, options)
}
export function getDiscList() {
	const url = 'api/getDiscList'
	const data = Object.assign({},commonParams, {
		platform: 'yqq',
		picmid:1,
	    loginUin:0,
		hostUin:0,
		needNewCode:0,
		picmid:1,
		rnd:0.3120247148071924,
		needNewCode:0,
		categoryId:10000000,
		sortId:5,
		sin:0,
		ein:29,
		format:'json'
	})
	return axios.get(url,{
		params:data
	}).then((res) => {
		return Promise.resolve(res.data);
	})
}
export function getBanner() {
	const url = 'api/getBanner'
	const data = Object.assign({
		limit:4,
		type:'new'
	})
	return axios.get(url,{
		params:data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}