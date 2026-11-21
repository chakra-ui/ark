import './root.js'
import './parts.js'
import type { Props } from '@zag-js/scroll-area'
import type { RootElement } from '../../utils/define.js'
import type { Api } from './shared.js'

export type { Api as ScrollAreaApi } from './shared.js'
export type ScrollAreaElement = RootElement<Api, Props> & Pick<Props, 'ids'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-scroll-area': ScrollAreaElement
  }
}
