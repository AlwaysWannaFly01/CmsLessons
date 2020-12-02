const contentRouter = {
    route: null,
    name: null,
    title: '期刊管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-tushuguanli',
    filePath: 'views/book/', // 文件路径
    order: 3,
    inNav: true,
    children: [
        {
            title: '内容管理',
            type: 'view',
            name: 'content',
            route: '/content/list',
            filePath: 'views/content/List.vue',
            inNav: true,
            icon: 'iconfont icon-tushuguanli',
        },
    ],
}

export default contentRouter
