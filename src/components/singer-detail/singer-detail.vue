<template>
	<transition name="slide">
	<music-list :songs='songs' :bg-image="bgImage" :title="title"></music-list>
	</transition>
</template>
<script>
	import {mapGetters} from 'vuex'
	import {getSingerDetail,getSongVkey} from '@/api/singer.js'
	import {ERR_OK} from '@/api/config.js'
	import {createSong} from '@/common/js/song.js'
	import musicList from '@/components/music-list/music-list'
	export default{
		data(){
			return {
				songs: []
			}
		},
		computed: {
			title() {
				return this.singer.name
			},
			bgImage() {
				return this.singer.avatar
			},
			...mapGetters([
				'singer'
			])
		},
		created() {
			this._getSingerDetail()
			
		},
		methods: {
			_getSingerDetail() {
				if(!this.singer.id) {
					this.$router.push('/singer')
					return
				}
				getSingerDetail(this.singer.id).then((res) => {
					if(res.code === ERR_OK){
						this.songs = this._normallizeSong(res.data.list)
						
					}
				})
			},
			_normallizeSong(list) {
				let ret = []
				list.forEach((item) => {
					let {musicData} = item
					if(musicData.songid && musicData.albummid){
						getSongVkey(musicData.songmid,`C400${musicData.songmid}.m4a`).then((res) => {

							if(res.code === ERR_OK){
								
								let vKey = res.data.items[0].vkey
								ret.push(createSong(musicData,vKey))
							}
							
							
						})
						
					}
				})
				return ret
			}
		},
		components: {
			musicList
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet">
	@import "~@/common/stylus/variable"
	.singer-detail
		position:fixed
		z-index:100
		top:0
		left:0
		right:0
		bottom:0
		background:$color-background
	.slide-enter-active,.slide-leave-active
		transition:0.3s all
	.slide-enter,.slider-leave-to
		transform:translate3d(100%,0,0)
</style>