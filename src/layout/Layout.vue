<script setup lang="ts">
import { ref } from 'vue'
import { Operation, ArrowDown } from '@element-plus/icons-vue'

import MenuItem from './components/MenuItem.vue'
import { menuList } from '../router'

const isCollapse = ref(false)

const userInfo = ref({
  name: 'admin',
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
</script>

<template>
  <div class="layout">
    <div class="aside" :class="{ collapse: isCollapse }">
      <div class="title">
        <div class="logo">
          <!-- <img :src="logoImg" alt="项目功能测试" title="项目功能测试" /> -->
        </div>
        <span v-show="!isCollapse" style="white-space: nowrap"
          >项目功能测试</span
        >
      </div>
      <div class="menu-wrap">
        <el-menu
          :default-active="$route.path"
          class="menu-list el-menu-vertical-demo"
          :collapse="isCollapse"
          :router="true"
        >
          <template v-for="item in menuList" :key="item.path">
            <MenuItem :menu-info="item"></MenuItem>
          </template>
        </el-menu>
      </div>
    </div>
    <div class="article">
      <div class="head">
        <div class="menu">
          <div class="icon" @click="isCollapse = !isCollapse">
            <el-icon><Operation /></el-icon>
          </div>
        </div>
        <div class="user-info">
          <el-dropdown>
            <div class="info">
              <div class="avatar">
                <img :src="userInfo.avatar" alt="" />
              </div>
              <div class="name">
                {{ userInfo.name }}
              </div>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  修改密码
                </el-dropdown-item>
                <el-dropdown-item>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@borderColor: #e9e9e9;
.layout {
  width: 100%;
  height: 100vh;
  display: flex;
  .aside {
    width: 220px;
    transition: all 0.3s;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    // background-color: #192430;
    color: #333;
    border-right: 1px solid @borderColor;
    .title {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0 15px;
      border-bottom: 1px solid @borderColor;
      .logo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #fff;
        margin-right: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
        }
      }
    }
    .menu-wrap {
      user-select: none;
      .menu-list {
        border-right: none;
        // --el-menu-bg-color: #192430;
        // --el-menu-text-color: #ffffff;
        // --el-menu-hover-bg-color: #306bff81;
      }
      // :deep(.el-menu-item.is-active) {
      //   background-color: #306bff;
      //   color: #fff;
      // }
    }
  }
  .collapse {
    width: 64px;
    .title {
      padding: 0;
      .logo {
        margin: 0 auto;
      }
    }
  }
  .article {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // background-color: yellowgreen;
    .head {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border-bottom: 1px solid @borderColor;
      .menu {
        font-size: 20px;
        color: #333;
        cursor: pointer;
        display: flex;
        align-items: center;

        .icon {
          &:hover {
            color: #4694fa;
          }
        }
        .list {
          margin-left: 15px;
          .active {
            :deep(.is-link) {
              color: #4694fa;
            }
          }
        }
      }
      .user-info {
        .info {
          display: flex;
          align-items: center;
          cursor: pointer;
          outline: none;
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #fff;
            margin-right: 5px;
            img {
              width: 100%;
            }
          }
          .name {
            margin-right: 3px;
            .count {
              display: inline-block;
              width: 20px;
              line-height: 20px;
              text-align: center;
              border-radius: 50%;
              background-color: #f56c6c;
              color: #fff;
              position: relative;
              transform: scale(0.8);
              top: -5px;
              left: -5px;
            }
          }
        }
      }
    }
    .content {
      flex: 1;
      width: 100%;
      // background-color: #eee;
      box-sizing: border-box;
      padding: 8px;
      overflow: hidden;
    }
  }
  .talbe {
    width: 100%;
  }
  .paging {
    width: 100%;
    margin: 20px 0 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
