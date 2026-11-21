import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/floating-panel'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'

export type { Api as FloatingPanelApi } from '@zag-js/floating-panel'
export interface FloatingPanelElement
  extends
    ActionMethods<Api, 'minimize' | 'maximize' | 'restore'>,
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<
      Props,
      'ids' | 'translations' | 'size' | 'defaultSize' | 'minSize' | 'maxSize' | 'position' | 'defaultPosition'
    >,
    StateProperties<Props, 'open'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-floating-panel': FloatingPanelElement
  }
}

export type FloatingPanelEventMap = CallbackEvents<Props>
