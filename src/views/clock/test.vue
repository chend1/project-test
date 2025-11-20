<script setup lang="ts">
import { ref, onMounted } from 'vue'

/** 单个数字结构 */
interface FlipItem {
  current: number // 当前数字
  next: number // 下一个数字
  flipping: boolean // 是否在翻转
}

const timeList = ref<FlipItem[]>([])

function getTimeStr() {
  const d = new Date()
  return d.toLocaleTimeString('zh-CN', { hour12: false }) // HH:MM:SS
}

/** 初始化 HH:MM:SS，每个字符一个 FlipItem */
function initTime() {
  const str = getTimeStr()
  timeList.value = []

  for (const char of str) {
    if (char === ':') {
      timeList.value.push({ current: -1, next: -1, flipping: false }) // 分隔符
    } else {
      const num = parseInt(char)
      timeList.value.push({
        current: num,
        next: num,
        flipping: false,
      })
    }
  }
}

/** 每秒更新 */
function updateTime() {
  const str = getTimeStr()

  str.split('').forEach((char, i) => {
    if (char === ':') return

    const num = parseInt(char)
    const item = timeList.value[i]

    if (item.current !== num) {
      item.next = num
      item.flipping = true

      setTimeout(() => {
        item.current = num
        item.flipping = false
      }, 600)
    }
  })
}

onMounted(() => {
  initTime()
  setInterval(updateTime, 1000)
})
</script>

<template>
  <div class="clock">
    <template v-for="(item, i) in timeList" :key="i">
      <!-- 冒号 -->
      <div v-if="item.current === -1" class="colon">:</div>

      <!-- 数字翻牌 -->
      <div v-else :class="['flip-item', { flipping: item.flipping }]">
        <!-- 上半片（当前数字） -->
        <div class="upper">
          <span>{{ item.current }}</span>
        </div>

        <!-- 下半片（当前数字） -->
        <div class="lower">
          <span>{{ item.current }}</span>
        </div>

        <!-- 翻下去的上半片（翻到 next） -->
        <div class="upper-flip">
          <span>{{ item.current }}</span>
        </div>

        <!-- 翻上来的下半片（next） -->
        <div class="lower-flip">
          <span>{{ item.next }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.clock {
  display: flex;
  gap: 12px;
  font-size: 60px;
}

.colon {
  font-size: 60px;
  transform: translateY(-5px);
}

/* 翻牌容器 */
.flip-item {
  width: 60px;
  height: 90px;
  position: relative;
  perspective: 400px;
}

/* 上下两半 */
.upper,
.lower,
.upper-flip,
.lower-flip {
  position: absolute;
  width: 100%;
  height: 50%;
  overflow: hidden;
  left: 0;
}

.upper {
  top: 0;
  border-radius: 6px 6px 0 0;
  background: #333;
}

.lower {
  bottom: 0;
  border-radius: 0 0 6px 6px;
  background: #333;
}

/* 数字居中 */
.upper span,
.lower span,
.upper-flip span,
.lower-flip span {
  display: block;
  width: 100%;
  height: 180%;
  font-size: 70px;
  color: #fff;
  text-align: center;
  line-height: 90px;
}

/* 上翻片（从当前翻下去） */
.upper-flip {
  top: 0;
  height: 50%;
  background: #333;
  border-radius: 6px 6px 0 0;
  transform-origin: center bottom;
  transform: rotateX(0deg);
  z-index: 2;
}

/* 下翻片（从下一数字翻上来） */
.lower-flip {
  bottom: 0;
  height: 50%;
  background: #333;
  border-radius: 0 0 6px 6px;
  transform-origin: center top;
  transform: rotateX(90deg);
  z-index: 1;
}

/* 动画触发 */
.flipping .upper-flip {
  animation: flip-down 0.6s ease-in-out forwards;
}

.flipping .lower-flip {
  animation: flip-up 0.6s ease-in-out forwards;
}

/* 上半片翻下 */
@keyframes flip-down {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-90deg);
  }
}

/* 下半片翻上来 */
@keyframes flip-up {
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
</style>
