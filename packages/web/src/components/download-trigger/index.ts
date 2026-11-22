import { DownloadTriggerElement } from './root.js'

export { DownloadTriggerElement }
export type { DownloadableData, DownloadTriggerData } from './root.js'

declare global {
  interface HTMLElementTagNameMap {
    'ark-download-trigger': DownloadTriggerElement
  }
}
