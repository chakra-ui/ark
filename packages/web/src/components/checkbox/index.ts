import type { EventElement, InputSource } from '../../utils/events.js'
import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/checkbox'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as CheckboxApi } from '@zag-js/checkbox'
export type CheckboxElement = RootElement<Api, Props> & Pick<Props, 'ids'> & StateProperties<Props, 'checked'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-checkbox': CheckboxElement
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
