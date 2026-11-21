import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/clipboard'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type {
  ClipboardLabel,
  ClipboardControl,
  ClipboardInput,
  ClipboardTrigger,
  ClipboardIndicator,
  ClipboardValueText,
} from './parts.js'

export type { Api as ClipboardApi } from '@zag-js/clipboard'
export interface ClipboardElement
  extends
    ActionMethods<Api, 'copy'>,
    RootElement<Api, Props>,
    Pick<Props, 'ids' | 'translations'>,
    StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-clipboard': ClipboardElement
    'ark-clipboard-label': InstanceType<typeof ClipboardLabel>
    'ark-clipboard-control': InstanceType<typeof ClipboardControl>
    'ark-clipboard-input': InstanceType<typeof ClipboardInput>
    'ark-clipboard-trigger': InstanceType<typeof ClipboardTrigger>
    'ark-clipboard-indicator': InstanceType<typeof ClipboardIndicator>
    'ark-clipboard-value-text': InstanceType<typeof ClipboardValueText>
  }
}

export type ClipboardEventMap = CallbackEvents<Props>
