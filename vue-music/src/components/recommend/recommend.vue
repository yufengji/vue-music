<template>
	<div class="recommend">
		<scroll ref="scroll" class="recommend-content" :data='disclist'>
			<div>
				<div class="slider-wrapper">
					<slider v-if="recommends.length">
						<div v-for="item in recommends">
							<a :href="item.linkUrl">
								<img @load = "_loadedImg" :src="item.picUrl">
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li v-for="item in disclist" class="item">
							<div class="icon">
								<img width="60" height="60" :src="item.imgurl">
							</div>
							<div class="text">
								<h2 class="name" v-html="item.creator.name"></h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-show="!disclist.length">
				<loading></loading>
			</div>
		</scroll>
	</div>
</template>
<script>
	import Loading from "@/base/loading/loading";
	import Scroll from '@/base/scroll/scroll'
	import Slider from '@/base/slider/slider'
	import {getRecommend, getDiscList, getBanner} from '@/api/recommend.js'
	import {ERR_OK} from '@/api/config.js'
	export default{
		data() {
			return {
				recommends:[],
				disclist:[]
			}
		},
		created() {
			//这是个异步请求的过程，需要时间几百毫秒或者几秒
			//这个时候mouted已经执行，异步还没完成没有数据，时机不对
			//mouted里的方法就无法执行
			this._getRecommend()
			this._getDiscList()
			this._getBanner()
		},
		methods: {
			_getRecommend() {
				getRecommend().then((res) => {
					if(res.code === ERR_OK){
						
						this.recommends = res.data.slider;
					}
				})
			},
			_getDiscList() {
				getDiscList().then((res) => {

					if(res.code === ERR_OK){

						this.disclist = res.data.list;

					}
				})
			},
			_getBanner() {
				getBanner().then((res) => {
					/*console.log(res)*/
				})
			},
			_loadedImg() {

				if(!this.checkloaded) {
					this.$refs.scroll.refresh()
					this.checkloaded = true
				}

				
			}
		},
		components: {
			Slider,
			Scroll,
			Loading
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~@/common/stylus/variable"
	.recommend
	  position: fixed
	  width: 100%
	  top: 88px
	  bottom: 0
	  .recommend-content
	    height: 100%
	    overflow: hidden
	    .slider-wrapper
	      position: relative
	      width: 100%
	      overflow: hidden
	    .recommend-list
	      .list-title
	        height: 65px
	        line-height: 65px
	        text-align: center
	        font-size: $font-size-medium
	        color: $color-theme
	      .item
	        display: flex
	        box-sizing: border-box
	        align-items: center
	        padding: 0 20px 20px 20px
	        .icon
	          flex: 0 0 60px
	          width: 60px
	          padding-right: 20px
	        .text
	          display: flex
	          flex-direction: column
	          justify-content: center
	          flex: 1
	          line-height: 20px
	          overflow: hidden
	          font-size: $font-size-medium
	          .name
	            margin-bottom: 10px
	            color: $color-text
	          .desc
	            color: $color-text-d
		.loading-container
		  position: absolute
		  width: 100%
		  top: 50%
		  transform: translateY(-50%)
</style>