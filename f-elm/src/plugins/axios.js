import {baseUrl} from '../config/env.js'
// 整合axios 
import axios from 'axios';
import qs from 'qs';
// 设置Axios 的默认全局设置
axios.defaults.timeout = 3000;    //响应时间
axios.defaults.baseURL = baseUrl; //配置接口地址
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    _.toast("错误的传参", 'fail');
    return Promise.reject(error);
    // throw new Error(error)
});

// 作为vue 的插架使用（在main.js vue use 调用install 方法，所有打的子组件都可以使用）
export default {
    install: function (Vue) {
        Vue.prototype.$http = axios;
    }
    // axios //相当于axios:axios es6 对象属性赋值简写
}
