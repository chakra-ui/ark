import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/toc'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { TocContent, TocIndicator, TocItem, TocLink, TocList, TocNav, TocTitle } from './parts.js'

export type { Api as TocApi, ActiveChangeDetails as TocActiveChangeDetails, TocItem } from '@zag-js/toc'
export interface TocElement
  extends RootElement<Api, Props>, Pick<Props, 'ids' | 'items' | 'scrollEl'>, StateProperties<Props, 'activeIds'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-toc': TocElement
    'ark-toc-content': InstanceType<typeof TocContent>
    'ark-toc-nav': InstanceType<typeof TocNav>
    'ark-toc-title': InstanceType<typeof TocTitle>
    'ark-toc-list': InstanceType<typeof TocList>
    'ark-toc-item': InstanceType<typeof TocItem>
    'ark-toc-link': InstanceType<typeof TocLink>
    'ark-toc-indicator': InstanceType<typeof TocIndicator>
  }
}

export type TocEventMap = CallbackEvents<Props>
