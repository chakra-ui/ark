import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/pagination'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type {
  PaginationItem,
  PaginationEllipsis,
  PaginationFirstTrigger,
  PaginationPreviousTrigger,
  PaginationNextTrigger,
  PaginationLastTrigger,
} from './parts.js'

export type { Api as PaginationApi } from '@zag-js/pagination'
export interface PaginationElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'translations'>,
    StateProperties<Props, 'page' | 'pageSize'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-pagination': PaginationElement
    'ark-pagination-item': InstanceType<typeof PaginationItem>
    'ark-pagination-ellipsis': InstanceType<typeof PaginationEllipsis>
    'ark-pagination-first-trigger': InstanceType<typeof PaginationFirstTrigger>
    'ark-pagination-previous-trigger': InstanceType<typeof PaginationPreviousTrigger>
    'ark-pagination-next-trigger': InstanceType<typeof PaginationNextTrigger>
    'ark-pagination-last-trigger': InstanceType<typeof PaginationLastTrigger>
  }
}

export type PaginationEventMap = CallbackEvents<Props>
