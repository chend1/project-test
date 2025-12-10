<script setup lang="ts">
import { ref } from 'vue'
import ContextMenu from '@/directives/contextMenu/components/ContextMenu.vue'

const menuList = ref([
  {
    title: '组1',
    children: [
      {
        name: '组1菜单1',
        params: '{}',
        method: () => console.log('菜单1'),
        children: [
          {
            title: '组1-1',
            children: [
              {
                name: '菜单1菜单1',
                params: '{}',
                method: () => console.log('菜单1菜单1'),
              },
              {
                name: '菜单1菜单2',
                params: '{}',
                method: () => console.log('菜单1菜单2'),
              },
            ],
          },
        ],
      },
      {
        name: '组1菜单2',
        params: '{}',
        method: () => console.log('菜单2'),
      },
    ],
  },
  {
    title: '组2',
    children: [
      {
        name: '组2菜单1',
        params: '{}',
        method: () => console.log('组2菜单1'),
      },
    ],
  },
])
</script>

<template>
  <div class="login">
    登录页面
    <div class="custom-menu">
      <div class="menu-list dark">
        <div class="menu-item">
          <ul>
            <li>
              <div class="name">复制</div>
              <div class="desc">CTRL+C</div>
              <div class="menu-list">
                <div class="menu-item">
                  <ul>
                    <li>
                      <div class="name">测试菜单2</div>
                      <div class="icon"></div>
                    </li>
                    <li>
                      <div class="name">测试菜单2</div>
                      <div class="icon"></div>
                    </li>
                    <li>
                      <div class="name">测试菜单2</div>
                      <div class="icon"></div>
                    </li>
                  </ul>
                </div>
                <div class="menu-item">
                  <ul>
                    <li>
                      <div class="name">测试菜单3</div>
                      <div class="icon"></div>
                    </li>
                    <li>
                      <div class="name">测试菜单3</div>
                      <div class="icon"></div>
                    </li>
                    <li>
                      <div class="name">测试菜单3</div>
                      <div class="icon"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="name">测试菜单</div>
              <div class="icon"></div>
            </li>
            <li>
              <div class="name">测试菜单</div>
              <div class="icon"></div>
            </li>
          </ul>
        </div>
      </div>
      <ContextMenu :menu-list="menuList" theme="dark" />
      <ContextMenu :menu-list="menuList" theme="light" />
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
  width: 160px;
  background-color: var(--bg-color);
  box-shadow: 1px 1px 5px #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 2px;
  color: var(--color);
  .menu-item {
    border-bottom: 1px solid var(--border-color);
    width: 100%;
    margin-bottom: 2px;
    padding-bottom: 2px;
    &:last-child {
      border-bottom: none;
      margin-bottom: none;
      padding-bottom: none;
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
            display: block;
          }
        }
      }
    }
  }
  .menu-list {
    position: absolute;
    z-index: 999;
    top: -2px;
    left: calc(100% - 2px);
    display: none;
  }
}
</style>
