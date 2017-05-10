<template>
	<div>
		<head-top signin-up='msite'>
			<router-link :to="'/search/' + geohash" class="link_search" slot="search">
				<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
					<circle cx="9" cy="9" r="8" stroke="rgb(255,255,255)" stroke-width="2" fill="none" />
					<line x1="15" y1="15" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2" />
				</svg>
			</router-link>
			<router-link to="/home" slot="msite-title" class="msite_title">
				<span class="title_text ellipsis">{{msietTitle}}</span>
			</router-link>
		</head-top>
		<nav class="msite_nav">
			<mt-swipe :auto="0" :continuous="false">
				<mt-swipe-item v-for="(item, index) in foodTypes" :key="index">
					<div class="food_types_container">
						<router-link :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food" v-if="foodItem.title !== '预订早餐'">
							<figure>
								<img :src="imgBaseUrl + foodItem.image_url">
								<figcaption>{{foodItem.title}}</figcaption>
							</figure>
						</router-link>
						<a href="https://zaocan.ele.me/" class="link_to_food" v-else>
							<figure>
								<img :src="imgBaseUrl + foodItem.image_url">
								<figcaption>{{foodItem.title}}</figcaption>
							</figure>
						</a>
					</div>
	
				</mt-swipe-item>
			</mt-swipe>
		</nav>
		<div class="shop_list_container">
			<header class="shop_header">
				<svg class="shop_icon">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
				</svg>
				<span class="shop_header_title">附近商家</span>
			</header>
			<shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
		</div>
	
		<foot-guide></foot-guide>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import { imgBaseUrl } from 'src/config/env'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import shopList from 'src/components/common/shoplist'
import { msiteAdress, msiteFoodTypes, msiteShopList } from 'src/service/getData'
export default {
	data() {
		return {
			geohash: this.$route.query.geohash, // city页面传递过来的地址geohash
			msietTitle: '定位中...', // msiet页面头部标题
			foodTypes: [], // 食品分类列表
			hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
			imgBaseUrl, //图片域名地址
		}
	},
	// es7
	// async 表示这是一个async函数，await只能用在这个函数里面。
	// await 表示在这里等待promise返回结果了，再继续执行。
	// await 后面跟着的应该是一个promise对象（当然，其他返回值也没关系，只是会立即执行，不过那样就没有意义了..）
	//await命令就是内部then命令的语法糖。
	mounted() {
		this.getPos(this.geohash)
	},
	components: {
		headTop,
		shopList,
		footGuide,
	},
	methods: {
		getPos(geohash) {
			if (geohash) {
				this.manipulation(geohash)
			} else {
				this.autoGetPos()
			}
		},
		// 自动定位
		autoGetPos() {
			const self = this
			//检测是否支持定位
			if (window.navigator.geolocation) {
				window.navigator.geolocation.getCurrentPosition(function (position) {
					self.$http.get('/bgs/poi/reverse_geo_coding', {
						params: {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
							// latitude: 40.075510287511776,
							// longitude: 116.41907302638684
						}
					}).then(res => {
						self.savePosInfo(res.data)
					}).catch(err => {
						self.msietTitle = "请手动定位"
					})
				}, function (error) {
					self.msietTitle = "请手动定位"
				})
			} else {
				self.msietTitle = "请手动定位"
			}
		},
		// 手动定位
		manipulation(geohash) {
			msiteAdress(geohash).then(res => {
				this.savePosInfo(res)
			});
		},
		//定位后的操作
		savePosInfo(res) {
			this.msietTitle = res.name;
			this.geohash = res.geohash;
			this.SAVE_GEOHASH(this.geohash);
			//记录当前经度纬度
			this.RECORD_ADDRESS(res);
			//获取商品的种类
			msiteFoodTypes(this.geohash).then(res => {
				let resLength = res.length;
				let resArr = res.concat([]); // 返回一个新的数组
				let foodArr = [];
				for (let i = 0, j = 0; i < resLength; i += 8, j++) {
					foodArr[j] = resArr.splice(0, 8);
				}
				this.foodTypes = foodArr;
			})
			// 是否请求食物的列表
			this.hasGetData = true;
		},
		...mapMutations([
			'RECORD_ADDRESS', 'SAVE_GEOHASH'
		]),
		// 解码url地址，求去restaurant_category_id值
		getCategoryId(url) {
			let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
			if (/restaurant_category_id/gi.test(urlData)) {
				return JSON.parse(urlData).restaurant_category_id.id
			} else {
				return ''
			}
		}
	},
}

</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.link_search {
	left: .8rem;
	@include wh(.8rem, .9rem);
	@include ct;
}

.msite_title {
	@include center;
	width: 50%;
	color: #fff;
	text-align: center;
	margin-left: -0.5rem;
	.title_text {
		@include sc(0.8rem, #fff);
		text-align: center;
		display: block;
	}
}

.msite_nav {
	margin-top: 2.1rem;
	background-color: #fff;
	border-bottom: 0.025rem solid $bc;
	height: 8.98rem;
	.food_types_container {
		height: 8.98rem;
		display: flex;
		flex-wrap: wrap;
		.link_to_food {
			width: 25%;
			padding: 0.3rem 0rem;
			@include fj(center);
			figure {
				img {
					margin-bottom: 0.3rem;
					@include wh(1.8rem, 1.8rem);
				}
				figcaption {
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
	}
}

.shop_list_container {
	margin-top: .4rem;
	border-top: 0.025rem solid $bc;
	background-color: #fff;
	.shop_header {
		.shop_icon {
			fill: #999;
			margin-left: 0.6rem;
			vertical-align: middle;
			@include wh(0.6rem, 0.6rem);
		}
		.shop_header_title {
			color: #999;
			@include font(0.55rem, 1.6rem);
		}
	}
}
</style>
