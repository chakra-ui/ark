import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/radio-group'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type {
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
} from './parts.js'

export type { Api as RadioGroupApi } from '@zag-js/radio-group'
export interface RadioGroupElement
  extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-radio-group': RadioGroupElement
    'ark-radio-group-label': InstanceType<typeof RadioGroupLabel>
    'ark-radio-group-indicator': InstanceType<typeof RadioGroupIndicator>
    'ark-radio-group-item': InstanceType<typeof RadioGroupItem>
    'ark-radio-group-item-text': InstanceType<typeof RadioGroupItemText>
    'ark-radio-group-item-control': InstanceType<typeof RadioGroupItemControl>
    'ark-radio-group-item-hidden-input': InstanceType<typeof RadioGroupItemHiddenInput>
  }
}

export type RadioGroupEventMap = CallbackEvents<Props>
