<script setup lang="ts">
import { ref } from 'vue'

const menuList = ref([
  {
    name: '菜单1',
    action: () => {
      console.log('菜单1')
    },
    children: [
      {
        name: '菜单1菜单1',
        action: () => {
          console.log('菜单1菜单1')
        },
      },
      {
        name: '菜单1菜单2',
        action: () => {
          console.log('菜单1菜单2')
        },
      },
    ],
  },
  {
    name: '菜单2',
    action: () => {
      console.log('菜单2')
    },
  },
])
</script>

<template>
  <div class="text-menu">
    <ul>
      <li v-context-menu="menuList">测试右键菜单</li>
      <li>测试右键菜单</li>
      <li>测试右键菜单</li>
      <li>测试右键菜单</li>
      <li>测试右键菜单</li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.text-menu {
  ul {
    width: 100px;
    li {
      cursor: pointer;
      line-height: 30px;
      border: 1px solid #ccc;
      margin-bottom: 10px;
      text-align: center;
    }
  }
}
</style>
