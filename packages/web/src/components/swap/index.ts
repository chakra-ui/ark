import './root.js'
import './parts.js'
import type { RootElement } from '../../utils/define.js'
import type { SwapIndicator } from './parts.js'
import type { SwapApi } from './shared.js'

export type { SwapApi } from './shared.js'
export interface SwapElement extends RootElement<SwapApi> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-swap': SwapElement
    'ark-swap-indicator': InstanceType<typeof SwapIndicator>
  }
}
