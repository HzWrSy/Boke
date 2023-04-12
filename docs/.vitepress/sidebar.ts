import {DefaultTheme} from "vitepress";
// @ts-ignore
import learnSidebar from '../learn/sidebar'
import sourceListSidebar from '../source-list/sidebar'


const sidebar: DefaultTheme.Sidebar = {
    '/learn':learnSidebar,
    '/source-list/': sourceListSidebar,

}
export default sidebar