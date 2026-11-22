import { FormatByteElement, FormatNumberElement, FormatRelativeTimeElement, FormatTimeElement } from './elements.js'

export { FormatByteElement, FormatNumberElement, FormatRelativeTimeElement, FormatTimeElement }
export type { FormatBytesOptions, FormatTimeOptions } from '@zag-js/i18n-utils'

declare global {
  interface HTMLElementTagNameMap {
    'ark-format-number': FormatNumberElement
    'ark-format-byte': FormatByteElement
    'ark-format-relative-time': FormatRelativeTimeElement
    'ark-format-time': FormatTimeElement
  }
}
