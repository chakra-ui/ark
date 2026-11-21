import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/tabs'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type { TabsContent, TabsIndicator, TabsList, TabsTrigger } from './parts.js'

export type { Api as TabsApi } from '@zag-js/tabs'
export interface TabsElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'translations'>,
    StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-tabs': TabsElement
    'ark-tabs-trigger': InstanceType<typeof TabsTrigger>
    'ark-tabs-content': InstanceType<typeof TabsContent>
    'ark-tabs-list': InstanceType<typeof TabsList>
    'ark-tabs-indicator': InstanceType<typeof TabsIndicator>
  }
}

export type TabsEventMap = CallbackEvents<Props>
