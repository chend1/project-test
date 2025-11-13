<script setup></script>

<template>
  <div class="text-line">
    <p>
      <span>
        测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画，测试文字下划线动画
      </span>
    </p>
  </div>
</template>

<style lang="less" scoped>
.text-line {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    width: 100%;
    font-size: 20px;
    box-sizing: border-box;
    padding: 50px;
    line-height: 30px;
    span {
      background: linear-gradient(#ff0000, #ff0000) no-repeat;
      background-size: 0 2px;
      background-position: right bottom;
      transition: background-size 0.3s ease-in-out;
    }
    &:hover span {
      background-position: left bottom;
      background-size: 100% 2px;
    }
  }
}
</style>
