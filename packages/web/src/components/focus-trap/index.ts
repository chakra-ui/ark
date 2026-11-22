import { FocusTrapElement } from './root.js'

export { FocusTrapElement }
export type { FocusTrapFallback, FocusTrapPersistentElements, FocusTrapReturnTarget, FocusTrapTarget } from './root.js'

declare global {
  interface HTMLElementTagNameMap {
    'ark-focus-trap': FocusTrapElement
  }
}
