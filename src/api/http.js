import axios from 'axios'
//axios实列
var instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 6000
})
//-----------------请求拦截器-----------------
instance.interceptors.request.use(
    function (config) {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization')
        }
        return config;
    }, function (error) {
        //the doing of faill
        return Promise.reject(error)
    }
);
//-------------------响应拦截器-------------------
instance.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        //the doing of faill
        return Promise.reject(error)
    }
);
/** 
 * 导出的函数帮助我们请求数据
 * 
 * @params {String} method 请求方法 如 get post put delete 
 * @paramss {String} url 请求地址
 * @params {Object} data 请求参数
 * @return {Promise} 返回promise对象 ==返回axios请求数据的返回值
*/


export default function (method, url, data = null) {
    method = method.toLowerCase();
    if (method == 'post') {
        return instance.post(url, data);
    } else if (method == 'get') {
        return instance.get(url, { params: data })
    } else if (method == 'dedlete') {
        return instance.delete(url, { params: data })
    } else if (method == 'put') {
        return instance.put(url, data)

    } else {
        console.error('未知的method' + method)
        return false;
    }
}