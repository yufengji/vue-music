<template>
	<scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" @scroll="scorll" :probeType = "probeType">
		<ul>
			<li v-for="group in data" class="list-group" ref="listGroup">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
						<img class="avatar" :src="item.avatar">
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
			<ul>
				<li v-for="(item, index) in shortcutList" class="item" :data-index="index" :class="{'current':currentIndex == index}">
					{{item}}
				</li>
			</ul>
		</div>
		<div v-show="!data.length" class="loading-container">
			<loading></loading>
		</div>
	</scroll>
</template>
<script>
	import Scroll from '@/base/scroll/scroll'
	import {getData} from '@/common/js/dom.js'
	import Loading from '@/base/loading/loading'
	const ANCHOR_HEIGHT = 18
	export default{
		created(){
			this.touch = {}
			//这里之所以不再data()中声明touch变量是因为在data()中声明的变量，vue会自动添加getter和setter，以便于监听变量跟dom进行绑定，但是这里的touch变量我们并不需要监听变化，所以不再data中声明
			this.listenScroll = true
			this.listHeight = []
			this.probeType = 3
		},
		data(){
			return {
				scrollY: -1,
				currentIndex: 0
			}
		},
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		components: {
			Scroll,
			Loading
		},
		computed: {
			shortcutList() {
				return this.data.map((item) => {
					return item.title.substr(0, 1)
				})
			}
		},
		watch: {
			data() {
				setTimeout(() => {
					this._calculaterHeight()
				},20)
			},
			scrollY(newY) {
				const listHeight = this.listHeight
				//滚动到顶部 newY>0
				if(newY > 0){
					this.currentIndex = 0
					return
				}
				//滚动到中间
				for(let i=0;i<listHeight.length-1;i++) {
					let height1 = listHeight[i]
					let height2 = listHeight[i+1]
					if(-newY>=height1 && -newY<height2) {
						this.currentIndex = i
						return
					}
				}
				//滚动到底部，且-newY大于最后一个元素的上限
				this.currentIndex = listHeight.length - 2
				this.currentIndex = 0
			}
		},
		methods: {
			onShortcutTouchStart(e) {
				let anchorIndex = getData(e.target,'index')
				let firstTouch = e.touches[0]
				this.touch.y1 = firstTouch.pageY
				this.touch.anchorIndex = anchorIndex
				
				this._scrollTo(anchorIndex)
			},
			onShortcutTouchMove(e) {
				let firstTouch = e.touches[0]
				this.touch.y2 = firstTouch.pageY
				let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
				let anchorIndex = parseInt(this.touch.anchorIndex) + delta
				
				this._scrollTo(anchorIndex)
			},
			_scrollTo(index) {
				if(!index && index != 0){
					return
				}
				if(index < 0){
					index = 0
				}else if(index > this.listHeight - 2){
					index = this.listHeight - 2
				}
				this.scrollY = -this.listHeight[index]
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index])
			},
			_calculaterHeight() {
				this.listHeight = []
				const list = this.$refs.listGroup
				let height = 0
				this.listHeight.push(height)
				for(let i=0; i<list.length; i++){
					let item = list[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			},
			scorll(pos) {
				this.scrollY = pos.y
			},
			selectItem(item) {
				this.$emit('selectSinger',item)
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
