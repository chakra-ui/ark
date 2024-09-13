import type * as timer from '@zag-js/timer'

export interface RootProps {
  /**
   * Whether the timer should start automatically
   */
  autoStart?: boolean
  /**
   * Whether the timer should countdown, decrementing the timer on each tick.
   */
  countdown?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the timer parts
   */
  ids?: Partial<{ root: string; area: string }>
  /**
   * The interval in milliseconds to update the timer count.
   * @default 250
   */
  interval?: number
  /**
   * The total duration of the timer in milliseconds.
   */
  startMs?: number
  /**
   * The minimum count of the timer in milliseconds.
   */
  targetMs?: number
}

export type RootEmits = {
  /**
   * Function invoked when the timer is completed
   */
  complete: []
  /**
   * Function invoked when the timer ticks
   */
  tick: [details: timer.TickDetails]
}
