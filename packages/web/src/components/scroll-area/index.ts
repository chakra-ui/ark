import './root.js'
import './parts.js'
import type { Props } from '@zag-js/scroll-area'
import type { RootElement } from '../../utils/define.js'
import type { Api } from './shared.js'
import type {
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from './parts.js'

export type { Api as ScrollAreaApi } from './shared.js'
export interface ScrollAreaElement extends RootElement<Api, Props>, Pick<Props, 'ids'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-scroll-area': ScrollAreaElement
    'ark-scroll-area-viewport': InstanceType<typeof ScrollAreaViewport>
    'ark-scroll-area-content': InstanceType<typeof ScrollAreaContent>
    'ark-scroll-area-scrollbar': InstanceType<typeof ScrollAreaScrollbar>
    'ark-scroll-area-thumb': InstanceType<typeof ScrollAreaThumb>
    'ark-scroll-area-corner': InstanceType<typeof ScrollAreaCorner>
  }
}
