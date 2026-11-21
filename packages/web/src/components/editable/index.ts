import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/editable'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as EditableApi } from '@zag-js/editable'
export type EditableElement = RootElement<Api, Props> & FunctionProperties<Props> & Pick<Props, 'ids' | 'translations'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-editable': EditableElement
  }
}

export type EditableEventMap = CallbackEvents<Props>
