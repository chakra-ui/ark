import type * as collapsible from '@zag-js/collapsible'
import { definePart, wrappedButton, rootOf } from '../../utils/define.js'
import { mountTemplate } from '../../utils/lazy.js'
import { root } from './shared.js'

export const CollapsibleTrigger = definePart<collapsible.Api>({
  tag: 'ark-collapsible-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
})

export const CollapsibleIndicator = definePart<collapsible.Api>({
  tag: 'ark-collapsible-indicator',
  root,
  props: (api) => api.getIndicatorProps(),
})

export const CollapsibleContent = definePart<collapsible.Api, collapsible.ContentState>({
  tag: 'ark-collapsible-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
  render: (api, el) => mountTemplate(el, api.visible, !!rootOf(el, root)?.hasAttribute('unmount-on-exit')),
})
