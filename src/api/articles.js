import req from './http'


//管理员登录
export const LOGIN = function (req) { return req('post', '/admin/login', params) }
//管理员登出
export const LOGOUT = function (req) { return req('post', '/admin/logout', params) }
