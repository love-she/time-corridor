/**
 * 组件示例 - 路由
 */
const compExampleRouter = [
    {
        path: '/upload-file',
        name: 'UploadFile',
        component: () => import(/* webpackChunkName: 'upload-file' */ '@/views/example/upload-file'),
        meta: {
            title: 'upload-file',
        },
    },
]

export default compExampleRouter
