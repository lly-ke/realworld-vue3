export default [
    {
        path: '/article/editor/:slug',
        component: () => import('@/pages/article/editor.vue'),
    },
    {
        path: '/user/profile/:username',
        component: () => import('@/pages/user/profile.vue'),
    },
]
