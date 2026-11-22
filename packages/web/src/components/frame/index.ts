import { FrameElement } from './root.js'

export { FrameElement }
export type { FrameHead } from './root.js'

declare global {
  interface HTMLElementTagNameMap {
    'ark-frame': FrameElement
  }
}
