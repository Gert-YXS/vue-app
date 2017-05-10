/**
 * dev pro 环境切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl; 
let routerMode;
const imgBaseUrl = 'https://fuss10.elemecdn.com';

if (process.env.NODE_ENV == 'development') {
	baseUrl = '';
	routerMode = 'hash'
}else{
	baseUrl = 'https://mainsite-restapi.ele.me';
	routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl
}