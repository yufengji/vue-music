<template>
	<div class="singer">
		<list-view @selectSinger="selectSinger" :data="singerlist"></list-view>
		<router-view></router-view>
	</div>
</template>
<script>
	import {getSinger} from '@/api/singer.js'
	import {ERR_OK} from '@/api/config.js'
	import Singer from '@/common/js/singer.js'
	import ListView from '@/base/listview/listview'
	import {mapMutations} from 'vuex'
	const HOT_NAME = '热门'
	const HOT_SINGER_LEN = 10
	export default{
		data(){
			return {
				singerlist:[],
				mormalsingerlist:[]
			}
		},
		created(){
			setTimeout(() => {
				this._getSingerList()
				

			},20)
		},
		methods:{
			_getSingerList() {
				getSinger().then((res)=>{
					if(res.code === ERR_OK){
						this.singerlist =  this._normallizeSinger(res.data.list)
						
					}
				})
			},
			_normallizeSinger(list) {
				let map = {
					hot: {
						title: HOT_NAME,
						items: []
					}
				}
				list.forEach((item, index) => {
					if(index < HOT_SINGER_LEN) {
						map.hot.items.push(new Singer({
							name: item.Fsinger_name,
							id: item.Fsinger_mid
						}))
					}
					const key = item.Findex
					if(!map[key]){
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push(new Singer({
						name: item.Fsinger_name,
						id: item.Fsinger_mid
					}))
				}) 
				//console.log(map)  得到的map对象是无序的（对象的遍历是无序的）
				//为了得到有序的map  需要处理map
				let hot = []
				let ret = []
				for(let key in map){
					let val = map[key]
					if(val.title.match(/[a-zA-Z]/)) {
						ret.push(val)
					}else if(val.title === HOT_NAME) {
						hot.push(val)
					}
				}
				//对ret进行排序
				ret.sort((a, b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})

				//合并返回
				return hot.concat(ret)
			},
			selectSinger(singer) {
				//console.log(singer)
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				this.setSinger(singer)
			},
			...mapMutations({
				setSinger: 'SET_SINGER'
			})

		},
		components:{
			ListView
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.singer	
		position:fixed
		top: 88px
		bottom: 0px
		width: 100%
</style>