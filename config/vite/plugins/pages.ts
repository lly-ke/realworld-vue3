/**
 * @name ConfigPagesPlugin
 * @description 动态生成路由
 */
import Pages from 'vite-plugin-pages'
export const ConfigPagesPlugin = () => {
    return Pages({
        pagesDir: [{ dir: 'src/pages', baseRoute: '' }],
        extensions: ['vue', 'md', 'tsx'],
        exclude: ['**/components/*.vue'],
        nuxtStyle: true,
    })
}