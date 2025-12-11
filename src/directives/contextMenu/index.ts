import { h, render, type VNode, type Directive, type DirectiveBinding } from 'vue'
import contentMenu from './components/index.vue'
import { transformMenu } from './utils'
import type { MenuGroupItem } from './types'

// 容器
const menuEl = document.createElement('div')
export const vContextMenu: Directive<HTMLElement, MenuGroupItem[]> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<MenuGroupItem[]>) {
    el.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault()
      const menuList = binding.value
      const newMenu = transformMenu(menuList)
      // 创建 VNode
      const vnode: VNode = h(contentMenu, {
        position: {
          x: e.pageX,
          y: e.pageY,
        },
        menuList: newMenu,
        onClose: () => {
          render(null, menuEl) // 卸载
          if (menuEl.parentNode) {
            document.body.removeChild(menuEl)
          }
        },
      })

      // 渲染
      render(vnode, menuEl)

      // 挂载到页面
      document.body.appendChild(menuEl)
    })
  },
}
