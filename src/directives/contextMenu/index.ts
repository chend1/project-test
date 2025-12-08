import { h, render, VNode } from 'vue'
import contentMenu from './components/index.vue'

// 容器
const menuEl = document.createElement('div')
export const vContextMenu = {
  beforeMount(el: HTMLElement, binding: any) {
    el.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault()
      const menuList = binding.value

      // 创建 VNode
      const vnode: VNode = h(contentMenu, {
        position: {
          positionX: e.pageX,
          positionY: e.pageY,
        },
        menuList,
        onClose: () => {
          render(null, menuEl) // 卸载
          document.body.removeChild(menuEl)
        },
      })

      // 渲染
      render(vnode, menuEl)

      // 挂载到页面
      document.body.appendChild(menuEl)
    })
  },
}
