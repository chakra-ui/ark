import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/splitter'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { SplitterPanel, SplitterResizeTrigger, SplitterResizeTriggerIndicator } from './parts.js'

export type { Api as SplitterApi } from '@zag-js/splitter'
export interface SplitterElement extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'size'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-splitter': SplitterElement
    'ark-splitter-panel': InstanceType<typeof SplitterPanel>
    'ark-splitter-resize-trigger': InstanceType<typeof SplitterResizeTrigger>
    'ark-splitter-resize-trigger-indicator': InstanceType<typeof SplitterResizeTriggerIndicator>
  }
}

export type SplitterEventMap = CallbackEvents<Props>
