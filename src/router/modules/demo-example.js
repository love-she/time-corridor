/**
 * 业务示例 - 路由
 */
const demoRouter = [
    {
        path: '/demo-example',
        name: 'DemoExample',
        component: () => import(/* webpackChunkName: 'demo-example' */ '@/views/demo-example'),
        meta: {
            title: 'demo-example',
        },
    },
    {
        path: '/demo-list',
        name: 'DemoList',
        component: () => import(/* webpackChunkName: 'demo-list' */ '@/views/demo-list'),
        meta: {
            title: 'demo-list',
        },
    },
    {
        path: '/demo-tab-list',
        name: 'DemoTabList',
        component: () => import(/* webpackChunkName: 'demo-tab-list' */ '@/views/demo-tab-list'),
        meta: {
            title: 'demo-tab-list',
        },
    },
]

export default demoRouter
