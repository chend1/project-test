<script setup lang="ts">
import { ref } from 'vue'
import { format } from '@/utils'
import type { ClockType } from '@/types/clockType'

const times = ref<ClockType[]>([])
const oldTimeStr = ref('')
const initTime = () => {
  const date = new Date()
  const str = format(date, 'HH:mm:ss')
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ':') {
      if (!times.value[i]) {
        times.value.push({ type: 'em' })
      }
    } else {
      const num = parseInt(str[i])
      const frontNum = num
      let backNum = num === 9 ? 0 : num + 1
      if (i === 0 && num === 2) {
        backNum = 0
      }
      if ((i === 3 || i === 6) && num === 5) {
        backNum = 0
      }
      const item: ClockType = {
        type: 'time',
        frontNum,
        backNum,
        isAnimation: false,
        duration: 700,
      }
      if (!times.value[i]) {
        times.value.push(item)
      }
      const isAnimation = oldTimeStr.value[i] ? oldTimeStr.value[i] !== str[i] : false
      const timeItem = times.value[i]
      if (timeItem.type === 'time' && isAnimation) {
        timeItem.isAnimation = true
        setTimeout(() => {
          // times.value[i] = item
          timeItem.frontNum = item.frontNum
          timeItem.backNum = item.backNum
          timeItem.isAnimation = false
        }, timeItem.duration)
      }
    }
  }
  oldTimeStr.value = str
}
setInterval(() => {
  initTime()
}, 1000)
initTime()
</script>

<template>
  <div class="clock">
    <div class="title">
      <span>时钟</span>
    </div>
    <div class="cnt">
      <div class="time">
        <template v-for="(item, index) in times" :key="item.type + index">
          <div
            class="time-item"
            v-if="item.type === 'time'"
            :class="{ animation: item.isAnimation }"
          >
            <div class="front" :class="`num${item.frontNum}`"></div>
            <div class="back" :class="`num${item.backNum}`"></div>
          </div>
          <div class="em" v-if="item.type === 'em'"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.clock {
  width: 100%;
  height: 100vh;
  .title {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 30px;
      font-weight: bold;
    }
  }
  .cnt {
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    .time {
      display: flex;
      align-items: center;
      .time-item {
        width: 60px;
        height: 90px;
        position: relative;
        background-color: #fff;
        box-shadow: #000 0 0 0 1px;
        border-radius: 6px;
        color: #fff;
        font-size: 80px;
        text-align: center;
        margin: 0 6px;
        .front,
        .back {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 6px;
          &::before {
            content: '0';
            position: absolute;
            width: 100%;
            height: calc(50% - 1px);
            background-color: #333;
            top: 0;
            left: 0;
            overflow: hidden;
            box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
            border-radius: 6px 6px 0 0;
          }
          &::after {
            content: '0';
            position: absolute;
            width: 100%;
            height: calc(50% - 1px);
            bottom: 0;
            left: 0;
            line-height: 0;
            background-color: #333;
            overflow: hidden;
            box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
            border-radius: 0 0 6px 6px;
          }
        }
        .front::before {
          transform-origin: 100% calc(100% + 1px);
          box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
          transform: perspective(160px) rotateX(0deg);
          backface-visibility: hidden;
          z-index: 2;
        }
        .back::after {
          box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
          transform-origin: 100% -1px;
          transform: perspective(160px) rotateX(180deg);
          backface-visibility: hidden;
        }
        .loop(@i) when (@i < 10) {
          .num@{i} {
            &::before {
              content: '@{i}';
            }
            &::after {
              content: '@{i}';
            }
          }
          .loop(@i + 1);
        }
        .loop(0);
      }
      .animation {
        .front {
          &::before {
            animation: frontBeforeFlip 0.7s ease-in-out both;
          }
        }
        .back {
          &::after {
            animation: backAfterFlip 0.7s ease-in-out both;
          }
        }
      }
      .em {
        width: 24px;
        height: 90px;
        position: relative;
        @emWidth: 10px;
        &::before,
        &::after {
          content: '';
          position: absolute;
          width: @emWidth;
          height: @emWidth;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          background-color: #333;
          border-radius: 50%;
        }
        &::after {
          top: 70%;
        }
      }
    }
  }
}
@keyframes frontBeforeFlip {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backAfterFlip {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}
</style>
