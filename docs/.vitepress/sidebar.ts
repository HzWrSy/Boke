import {DefaultTheme} from "vitepress";
// @ts-ignore
import learnSidebar from '../learn/sidebar'

const sidebar: DefaultTheme.Sidebar = {
    '/learn':learnSidebar
}
export default sidebar