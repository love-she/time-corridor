/**
 * 项目主要界面 - 路由
 */
const projectMainRouter = [
    {
        path: '/index',
        name: 'Index',
        component: () => import(/* webpackChunkName: 'index' */ '@/views/home/index'),
        meta: {
            title: '首页',
        },
    },
]

export default projectMainRouter
