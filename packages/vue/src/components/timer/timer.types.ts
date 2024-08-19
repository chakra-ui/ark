import type * as timer from '@zag-js/timer'

export interface RootProps {
  /**
   * Whether to start the timer automatically
   * @default false
   */
  autoStart?: boolean
  /**
   * Whether the timer is a countdown timer
   * @default false
   */
  countdown?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The interval between each tick in milliseconds
   * @default 1000
   */
  interval?: number
  /**
   * The initial start time in milliseconds
   * @default 0
   */
  startMs?: number
  /**
   * The target time in milliseconds (for countdown timer)
   */
  targetMs?: number
}

export type RootEmits = {
  /**
   * Callback fired when the timer completes
   */
  complete: []
  /**
   * Callback fired on each tick of the timer
   */
  tick: [details: timer.TickDetails]
}
