import type * as tabs from '@zag-js/tabs'
import { definePart, wrappedButton, rootOf } from '../../utils/define.js'
import { mountTemplate } from '../../utils/lazy.js'
import { root } from './shared.js'

const itemValue = (el: HTMLElement) => el.getAttribute('value') ?? ''

export const TabsList = definePart<tabs.Api>({ tag: 'ark-tabs-list', root, props: (api) => api.getListProps() })

const triggerProps = (el: HTMLElement) => ({ value: itemValue(el), disabled: el.hasAttribute('disabled') })

export const TabsTrigger = definePart<tabs.Api, tabs.TriggerState>({
  tag: 'ark-tabs-trigger',
  root,
  attributes: ['value', 'disabled'],
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps(triggerProps(el)),
  state: (api, el) => api.getTriggerState(triggerProps(el)),
})

export const TabsContent = definePart<tabs.Api, tabs.ContentState>({
  tag: 'ark-tabs-content',
  root,
  attributes: ['value'],
  props: (api, el) => api.getContentProps({ value: itemValue(el) }),
  state: (api, el) => api.getContentState({ value: itemValue(el) }),
  render: (api, el) =>
    mountTemplate(el, api.value === itemValue(el), !!rootOf(el, root)?.hasAttribute('unmount-on-exit')),
})

export const TabsIndicator = definePart<tabs.Api, tabs.IndicatorState>({
  tag: 'ark-tabs-indicator',
  root,
  props: (api) => api.getIndicatorProps(),
  state: (api) => api.getIndicatorState(),
})
