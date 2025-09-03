<script setup lang="ts">
import { onMounted, ref } from 'vue'

const imgWrapRef = ref(null)
onMounted(() => {
  const imgWrap = imgWrapRef.value as unknown as HTMLDivElement
  if(!imgWrap) return
  // 获取类名为img的子元素
  const imgs = imgWrap.getElementsByClassName('img')
  // 遍历子元素
  for (let i = 0; i < imgs.length; i++) {
    // 获取子元素的宽度和高度
    const img = imgs[i]
    const { width, height } = img.getBoundingClientRect()
    // 设置子元素的宽度和高度
    imgWrap.style.setProperty(`--w`, `${width}px`)
    imgWrap.style.setProperty(`--h`, `${height}px`)
    if (i === 0) {
      // 获取元素位置
      const { top: wrapTop, left: wrapLeft } = imgWrap.getBoundingClientRect()
      const { top, left } = img.getBoundingClientRect()
      // 设置元素位置
      imgWrap.style.setProperty(`--t`, `${top - wrapTop}px`)
      imgWrap.style.setProperty(`--l`, `${left - wrapLeft}px`)
      
      // console.log('mouseenter', top, left, wrapTop, wrapLeft);
    }
    // 鼠标移入
    img.addEventListener('mouseenter', () => {
      
      // 获取元素位置
      const { top: wrapTop, left: wrapLeft } = imgWrap.getBoundingClientRect()
      const { top, left } = img.getBoundingClientRect()
      // console.log('mouseenter', top, left, wrapTop, wrapLeft);
      // 设置元素位置
      imgWrap.style.setProperty(`--t`, `${top - wrapTop}px`)
      imgWrap.style.setProperty(`--l`, `${left - wrapLeft}px`)
    })
  }
})
</script>

<template>
  <div class="home">
    <div class="img-wrap" ref="imgWrapRef">
      <div class="mask"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
      <div class="img"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  justify-content: space-between;
  position: relative;
  --w: 100px;
  --h: 100px;
  --b: 2px;
  --p: 5px;
  --t: 0px;
  --l: 0px;
  .img {
    width: calc(25% - 10px);
    height: 180px;
    background-color: #ccc;
    margin-bottom: 10px;
  }
  // 190*180    208*198   
  .mask {
    box-sizing: border-box;
    position: absolute;
    top: calc(var(--t) - var(--p) - var(--b));
    left: calc(var(--l) - var(--p) - var(--b));
    width: calc(var(--w) + var(--p) * 2 + var(--b) * 2);//204
    height: calc(var(--h) + var(--p) * 2 + var(--b) * 2);
    border: var(--b) solid #c03c3c;
    transition: all 0.1s ease;
    mask: conic-gradient(at 30px 30px, transparent 75%, blue 75%) 0 0 /
    calc(100% - 30px) calc(100% - 30px);
  }
}
</style>
