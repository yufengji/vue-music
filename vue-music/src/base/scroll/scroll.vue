<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	export default {
		props:{
			probeType: {
				type:Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			data: {
				type: Array,
				default: null
			},
			listenScroll: {
				type: Boolean,
				default: false
			}
		},
		mounted(){
			setTimeout(() => {
				this._initScroll()
			},20)
		},
		methods:{
			_initScroll() {
				if(!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click
				})
				if(this.listenScroll) {
					let me = this  //vue实例调用，所以用me，因为用this的话this指向scroll
					this.scroll.on('scroll',(pos) => {
						me.$emit('scroll',pos) 
						//emit向父组件提交事件
					})
				}
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
				//因为这里需要传参数到this.scroll的scrollTo方法上，所以用apply
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
			}
		},
		wath: {
			data() {
				setTimeout(() => {
					this.refresh()
				},20)
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>