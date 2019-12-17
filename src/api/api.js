// import axios from 'axios';

// let base = '';

// export const requestLogin = params => {
//     return axios.post(`${base}/login`, params).then(res => res.data);
// };

// export const getUserList = params => {
//     return axios.get(`${base}/user/list`, {
//         params: params
//     });
// };

// export const getUserListPage = params => {
//     return axios.get(`${base}/user/listpage`, {
//         params: params
//     });
// };

// export const removeUser = params => {
//     return axios.get(`${base}/user/remove`, {
//         params: params
//     });
// };

// export const batchRemoveUser = params => {
//     return axios.get(`${base}/user/batchremove`, {
//         params: params
//     });
// };

// export const editUser = params => {
//     return axios.get(`${base}/user/edit`, {
//         params: params
//     });
// };

// export const addUser = params => {
//     return axios.get(`${base}/user/add`, {
//         params: params
//     });
// };
import { Loading } from 'element-ui';

module.exports = {
    admin_openid(data) {
        return request('api/get/admin/openid', data,"GET");
    },
    admin_userinfo(data) {
        return request('api/get/admin/userinfo', data,"GET");
    }, 
    admin_good_list(data) {
        return request('api/get/admin/good_list', data,"GET");
    },
    admin_more(data) {
        return request('api/get/admin/more', data,"GET");
    },
    admin_order_list(data) {
        return request('api/get/admin/order_list', data,"GET");
    },
    admin_address(data) {
        return request('api/get/admin/address', data,"GET");
    },
    admin_detail(data) {
        return request('api/get/admin/detail', data,"GET");
    } ,
    admin_events(data) {
        return request('api/get/admin/events', data,"GET");
    },
    admin_banner(data) {
        return request('api/get/admin/banner', data,"GET");
    },
    admin_hide(data) {
        return request('api/get/admin/hide', data,"GET");
    },
    
}
// var sreverPath="https://1434253600.xyz/";
var sreverPath="http://127.0.0.1:3001/";

function request(url, data={}, type) {
    return new Promise((resolve, reject)=>{       
        let loadingInstance = Loading.service();
        var $ajax = null;
        if(url.indexOf('http')==-1){
            url=sreverPath + url
        }
        if( type=='POST' ){
            $ajax = $.post( url, data);
        }else if( type=='GET' ){
            $ajax = $.get(url, data);
        }else{
            $ajax = $.getJSON(url + '?callback=?', data);
        }
        $ajax.done(res => {
            if( !res['success'] ) {
                resolve(res);
            } else {
                resolve(res);
            }
        })
        .fail(res=> {
            vueApp.alert('网络错误请重试！'); 

            resolve(res);
        })
        .always(res=>{
            loadingInstance.close();
        });
    })
}