<script setup lang="ts">
import { reactive, onMounted, watch, ref, nextTick, onBeforeUnmount } from 'vue'
import ContextMenu from './ContextMenu.vue'
import type { MenuGroupType, PositionType } from '../types'

/** props 类型声明 */
const props = defineProps<{
  position: PositionType
  menuList: MenuGroupType[]
  theme?: 'light' | 'dark'
}>()

/** 位置状态 */
const newPosition = ref<PositionType>(
  reactive({
    x: 0,
    y: 0,
    opacity: 0,
  })
)

/** 菜单方向 */
const direction = reactive({
  top: false,
  right: false,
  bottom: false,
  left: false,
})

/** 绑定菜单 DOM */
const menuRef = ref<HTMLUListElement | null>(null)

/** 监听位置变化 — 自动纠正上下左右方向 */
watch(
  () => props.position,
  () => {
    setTimeout(() => {
      const position = { ...props.position }

      const width = window.innerWidth
      const height = window.innerHeight

      const clientWidth = menuRef.value?.clientWidth ?? 0
      const clientHeight = menuRef.value?.clientHeight ?? 0

      // 水平方向检查
      if (width - position.x < clientWidth) {
        position.x -= clientWidth
        direction.left = false
        direction.right = true
      } else {
        direction.left = true
        direction.right = false
      }

      // 垂直方向检查
      if (height - position.y < clientHeight) {
        position.y -= clientHeight
        direction.top = false
        direction.bottom = true
      } else {
        direction.top = true
        direction.bottom = false
      }

      newPosition.value = position

      nextTick(() => {
        newPosition.value.opacity = 1
      })
    })
  },
  { deep: true, immediate: true }
)

/** emit 类型 */
const emit = defineEmits<{
  (e: 'close'): void
}>()

/** 关闭菜单 */
const closeMenu = () => {
  console.log('关闭菜单')

  emit('close')
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
})
</script>

<template>
  <div
    class="custom-menu"
    :style="{
      top: newPosition.y + 'px',
      left: newPosition.x + 'px',
      opacity: newPosition.opacity,
    }"
  >
    <div ref="menuRef" class="list">
      <ContextMenu
        :menu-list="menuList"
        :theme="theme || 'light'"
        :direction="direction"
        @close="closeMenu"
      ></ContextMenu>
    </div>
  </div>
</template>

<style lang="less" scoped>
.custom-menu {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9900;
}
</style>
