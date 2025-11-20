export type ClockType =
  | {
      type: 'time'
      frontNum: number
      backNum: number
      isAnimation: boolean
      duration: number
    }
  | {
      type: 'em'
    }
