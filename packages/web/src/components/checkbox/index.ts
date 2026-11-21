import type { EventElement, InputSource } from '../../utils/events.js'
import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/checkbox'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { CheckboxControl, CheckboxHiddenInput, CheckboxIndicator, CheckboxLabel } from './parts.js'

export type { Api as CheckboxApi } from '@zag-js/checkbox'
export interface CheckboxElement
  extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'checked'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-checkbox': CheckboxElement
    'ark-checkbox-indicator': InstanceType<typeof CheckboxIndicator>
    'ark-checkbox-hidden-input': InstanceType<typeof CheckboxHiddenInput>
    'ark-checkbox-label': InstanceType<typeof CheckboxLabel>
    'ark-checkbox-control': InstanceType<typeof CheckboxControl>
  }
}

export type CheckboxEventMap = CallbackEvents<Props>

export interface CheckboxGroupEventMap {
  valuechange: CustomEvent<{ value: string[]; source: InputSource }>
}
export interface CheckboxGroupElement extends EventElement<CheckboxGroupEventMap> {
  value: string[]
}
declare global {
  interface HTMLElementTagNameMap {
    'ark-checkbox-group': CheckboxGroupElement
  }
}
