import type * as marquee from '@zag-js/marquee'
import type { Optional } from '../../types'

export interface RootProps extends Optional<Omit<marquee.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface RootEmits {
  pauseChange: [details: marquee.PauseStatusDetails]
  loopComplete: []
  complete: []
}
