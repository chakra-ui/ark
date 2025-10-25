import type * as marquee from '@zag-js/marquee'

export interface RootProps {
  /**
   * Whether to automatically duplicate content to fill the container.
   * @default false
   */
  autoFill?: boolean
  /**
   * Whether the marquee is paused by default.
   * @default false
   */
  defaultPaused?: boolean
  /**
   * The delay before the animation starts (in seconds).
   * @default 0
   */
  delay?: number
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the marquee. Useful for composition.
   */
  ids?: Partial<{ root: string; viewport: string; content: (index: number) => string }>
  /**
   * The number of times to loop the animation (0 = infinite).
   * @default 0
   */
  loopCount?: number
  /**
   * Whether to pause the marquee on user interaction (hover, focus).
   * @default false
   */
  pauseOnInteraction?: boolean
  /**
   * Whether the marquee is paused.
   */
  paused?: boolean
  /**
   * Whether to reverse the animation direction.
   * @default false
   */
  reverse?: boolean
  /**
   * The side/direction the marquee scrolls towards.
   * @default "start"
   */
  side?: marquee.Side
  /**
   * The spacing between marquee items.
   * @default "1rem"
   */
  spacing?: string
  /**
   * The speed of the marquee animation in pixels per second.
   * @default 50
   */
  speed?: number
  /**
   * The localized messages to use.
   */
  translations?: marquee.IntlTranslations
}

export type RootEmits = {
  /**
   * Function called when the marquee completes all loops and stops.
   * Only fires for finite loops (loopCount > 0).
   */
  complete: []
  /**
   * Function called when the marquee completes one loop iteration.
   */
  loopComplete: []
  /**
   * Function called when the pause status changes.
   */
  pauseChange: [details: marquee.PauseStatusDetails]
}
