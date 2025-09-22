<script setup></script>

<template>
  <div class="text-gradient">
    <div class="box">
      <h2>文本渐变</h2>
    </div>
  </div>
</template>

<style lang="less" scoped>
.text-gradient {
  height: 100%;
  overflow-y: scroll;
  .box {
    height: 120vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    width: 100%;
    // height: 130vh;
    // line-height: 130vh;
    font-size: 60px;
    background: linear-gradient(#e66465 50%, transparent 50%) center center /
      100vw 100vh fixed;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    text-align: center;
    -webkit-text-stroke: 2px #fa6c6c;
  }
}
</style>
