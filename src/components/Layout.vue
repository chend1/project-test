<script setup lang='ts'>
import { menuList } from '../router'

</script>


<template>
  <div class="layout">
    <div class="nav">
      <ul>
        <li v-for="item in menuList" :key="item.name">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>


<style lang='less' scoped>
.layout {
  display: flex;
  .nav {
    width: 200px;
    ul {
      li {
        a {
          display: block;
          padding: 10px;
        }
      }
    }
  }
}
</style>