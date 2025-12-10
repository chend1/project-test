<script lang="ts" setup>
import type { MenuGroupType, MenuItemType } from '../types'

const props = defineProps<{
  menuList: MenuGroupType[]
  theme?: 'light' | 'dark'
}>()

/** emit 类型 */
const emit = defineEmits<{
  (e: 'close'): void
}>()

const menuClick = (menu: MenuItemType) => {
  menu.method?.(menu.params)
  emit('close')
}
</script>

<template>
  <div class="menu-list" :class="props.theme">
    <div class="menu-item" v-for="(item, index) in props.menuList" :key="'menu-' + index">
      <ul>
        <template v-for="menu in item.children" :key="menu.name">
          <li
            v-if="!menu.isHidden"
            @click.stop="menuClick(menu)"
            :title="menu.name"
            :key="menu.name"
          >
            <div class="name">{{ menu.name }}</div>
            <div class="desc">{{ menu.description }}</div>
            <div class="icon" v-if="menu.children?.length"></div>
            <ContextMenu
              v-if="menu.children?.length"
              :menu-list="menu.children"
              @close="emit('close')"
            />
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
.dark {
  --color: #d0d3d8;
  --bg-color: #292d33;
  --border-color: #565c64;
  --hover-bg-color: #3d444d;
}
.light {
  --color: #333;
  --bg-color: #fff;
  --border-color: #ccc;
  --hover-bg-color: #ececec;
}
.menu-list {
  position: relative;
  min-width: 80px;
  max-width: 300px;
  background-color: var(--bg-color);
  box-shadow: 1px 1px 5px #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 2px;
  color: var(--color);
  user-select: none;
  .menu-item {
    border-bottom: 1px solid var(--border-color);
    width: 100%;
    margin-bottom: 2px;
    padding-bottom: 2px;
    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    ul {
      width: 100%;
      li {
        cursor: pointer;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        border-radius: 3px;
        .name {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .icon {
          width: 20px;
          height: 20px;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            width: 6px;
            height: 6px;
            border-right: 1px solid var(--color);
            border-bottom: 1px solid var(--color);
            transform: rotate(-45deg);
            right: 0px;
            top: 50%;
            margin-top: -4px;
          }
        }
        .desc {
          text-align: right;
        }
        &:hover {
          background-color: var(--hover-bg-color);
          & > .menu-list {
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }
  }
  .menu-list {
    position: absolute;
    z-index: 9911;
    top: -2px;
    left: calc(100% - 2px);
    visibility: none;
    opacity: 0;
    transition-delay: 0.35s;
  }
}
</style>
