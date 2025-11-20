/**
 * 格式化日期
 *
 * @param {Date} date
 * @param {string} format
 * @return {string}
 *
 */
export type FormatKey = 'yyyy' | 'YYYY' | 'MM' | 'dd' | 'HH' | 'mm' | 'ss' | 'w'

export function format(date: Date, formatStr: string) {
  const pad = (n: number, len = 2) => String(n).padStart(len, '0')
  const map: Record<FormatKey, string | number> = {
    yyyy: date.getFullYear(),
    YYYY: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    dd: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    w: date.getDay(), // 0-6
  }
  return formatStr.replace(/yyyy|YYYY|MM|dd|HH|mm|ss|w/g, (substring: string) => {
    // 这里断言 substring 是 FormatKey
    const key = substring as FormatKey
    const value = map[key]
    if (key === 'w') {
      // @ts-ignore 也可以，但断言比较干净
      return ['日', '一', '二', '三', '四', '五', '六'][value as number]
    }
    return String(value)
  })
}
