import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/number-input'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type {
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputHiddenInput,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
  NumberInputScrubber,
  NumberInputScrubberCursor,
  NumberInputValueText,
} from './parts.js'

export type { Api as NumberInputApi } from '@zag-js/number-input'
export interface NumberInputElement
  extends
    ActionMethods<Api, 'increment' | 'decrement'>,
    RootElement<Api, Props>,
    Pick<Props, 'ids' | 'translations'>,
    StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-number-input': NumberInputElement
    'ark-number-input-input': InstanceType<typeof NumberInputInput>
    'ark-number-input-increment-trigger': InstanceType<typeof NumberInputIncrementTrigger>
    'ark-number-input-decrement-trigger': InstanceType<typeof NumberInputDecrementTrigger>
    'ark-number-input-scrubber-cursor': InstanceType<typeof NumberInputScrubberCursor>
    'ark-number-input-value-text': InstanceType<typeof NumberInputValueText>
    'ark-number-input-hidden-input': InstanceType<typeof NumberInputHiddenInput>
    'ark-number-input-label': InstanceType<typeof NumberInputLabel>
    'ark-number-input-control': InstanceType<typeof NumberInputControl>
    'ark-number-input-scrubber': InstanceType<typeof NumberInputScrubber>
  }
}

export type NumberInputEventMap = CallbackEvents<Props>
