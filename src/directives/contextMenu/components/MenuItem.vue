<template>
  <ul
    :class="{
      'menu-top': direction.top,
      'menu-right': direction.right,
      'menu-bottom': direction.bottom,
      'menu-left': direction.left,
    }"
    @click.stop
  >
    <li v-for="item in menuList" :key="item.name" @click="menuClick(item)">
      <span v-if="!item.isHidden">{{ item.name }}</span>

      <MenuItem
        v-if="item.children?.length"
        :menu-list="item.children"
        :direction="direction"
        @close="closeMenu"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { MenuItemType, DirectionType } from '../types'

const props = defineProps<{
  menuList: MenuItemType[]
  direction: DirectionType
}>()

const emit = defineEmits<{
  close: []
}>()

const menuClick = (item: MenuItemType) => {
  item.method?.(item.params)
  closeMenu()
}

const closeMenu = () => {
  emit('close')
}
</script>

<style lang="less" scoped>
ul {
  border-bottom: 1px solid #eee;
  border-radius: 2px;
  -moz-box-shadow: 2px 2px 8px #aaa;
  -webkit-box-shadow: 2px 2px 8px #aaa;
  box-shadow: 1px 2px 5px #aaa;
  li {
    position: relative;
    line-height: 28px;
    font-size: 12px;
    text-align: left;
    background-color: #fff;
    color: #333;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    border: 1px solid #eee;
    border-bottom: none;
    cursor: pointer;
    white-space: nowrap;
    ul {
      position: absolute;
      display: none;
      z-index: 999;
    }
    .menu-top {
      top: 0;
    }
    .menu-bottom {
      bottom: 0;
    }
    .menu-left {
      left: calc(100% - 2px);
    }
    .menu-right {
      right: calc(100% - 2px);
    }
    &:hover {
      background-color: #eee;
      & > ul {
        display: block;
      }
    }
  }
}
</style>
