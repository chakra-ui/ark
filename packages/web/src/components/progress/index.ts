import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/progress'
import type { RootElement } from '../../utils/define.js'
import type {
  ProgressCircle,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValueText,
  ProgressView,
} from './parts.js'

export type { Api as ProgressApi } from '@zag-js/progress'
export interface ProgressElement extends RootElement<Api, Props>, Pick<Props, 'ids' | 'translations'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-progress': ProgressElement
    'ark-progress-value-text': InstanceType<typeof ProgressValueText>
    'ark-progress-view': InstanceType<typeof ProgressView>
    'ark-progress-circle': InstanceType<typeof ProgressCircle>
    'ark-progress-label': InstanceType<typeof ProgressLabel>
    'ark-progress-track': InstanceType<typeof ProgressTrack>
    'ark-progress-range': InstanceType<typeof ProgressRange>
  }
}

export type ProgressEventMap = CallbackEvents<Props>
