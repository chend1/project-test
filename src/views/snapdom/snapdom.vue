<script setup lang='ts'>
import { ref } from 'vue';
import { snapdom } from '@zumer/snapdom';

const printRef = ref<HTMLElement>()

const handlePrint = async () => {
  if (printRef.value) {
    const result = await snapdom(printRef.value, {
      scale: 2
    })
    await result.download({ format: 'jpg', filename: '测试图片' });
    console.log(result);
  }
}

</script>


<template>
  <div class="snapdom">
    <div class="title">snapdom用法测试</div>
    <div class="content">
      <div class="left" ref="printRef">
        <div class="name">测试内容</div>
        <div class="img">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
        </div>
        <!-- <img src="" alt=""> -->
        <div class="text">
          <p>测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容</p>
        </div>
      </div>
      <div class="right">
        <button @click="handlePrint">打印</button>
      </div>
    </div>
  </div>
</template>


<style lang='less' scoped>
.snapdom{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title{
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .content{
    width: 800px;
    height: 600px;
    border: 1px solid #ebebeb;
    display: flex;
    .left{
      width: 50%;
      height: 100%;
      position: relative;
      img{
        max-width: 100%;
      }
      .text{
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        height: 100%;
        color: #fff;
        padding: 10px;
        box-sizing: border-box;
      }
    }
    .right{
      width: 50%;
      height: 100%;
    }
  }
}
</style>