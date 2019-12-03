import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

/**
 * 用户信息
 */
import openid from './views/user/openid.vue'
import userinfo from './views/user/userinfo.vue'
/**
 * 地址库
 */
import address from './views/user/address.vue'
/**
 * 订单
 */
import orderList from './views/order/order_list.vue'
import detail from './views/order/detail.vue'
/**
 * 商品信息 good_all
 */
import goodAll from './views/goods/good_all.vue'
import goodClass from './views/goods/good_class.vue'
import goodBanner from './views/goods/good_banner.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '用户信息',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/openid', component: openid, name: 'openid' },
            { path: '/userinfo', component: userinfo, name: 'userinfo' },
            { path: '/address', component: address, name: 'address' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单信息',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/orderList', component: orderList, name: 'orderList',  },
            { path: '/detail', component: detail, name: 'detail',  }
        ]
    },{
        path: '/',
        component: Home,
        name: '商品信息',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/goodAll', component: goodAll, name: 'goodAll',},
            { path: '/goodClass', component: goodClass, name: 'goodClass',},
            { path: '/goodBanner', component: goodBanner, name: 'goodBanner',}
        ]
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;