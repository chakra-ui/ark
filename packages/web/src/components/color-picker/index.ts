import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/color-picker'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as ColorPickerApi, Color, ColorFormat } from '@zag-js/color-picker'
export { parse as parseColor } from '@zag-js/color-picker'
export interface ColorPickerElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'positioning'>,
    StateProperties<Props, 'format' | 'open'> {
  value: string
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-color-picker': ColorPickerElement
  }
}

export type ColorPickerEventMap = CallbackEvents<Props>
