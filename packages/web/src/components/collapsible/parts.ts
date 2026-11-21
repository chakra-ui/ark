import type * as collapsible from '@zag-js/collapsible'
import { definePart, wrappedButton } from '../../utils/define.js'
import { mountTemplate } from '../../utils/lazy.js'
import { root } from './shared.js'

definePart<collapsible.Api>({
  tag: 'ark-collapsible-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
})

definePart<collapsible.Api>({ tag: 'ark-collapsible-indicator', root, props: (api) => api.getIndicatorProps() })

definePart<collapsible.Api>({
  tag: 'ark-collapsible-content',
  root,
  props: (api) => api.getContentProps(),
  render: (api, el) => mountTemplate(el, api.visible, !!el.closest(root)?.hasAttribute('unmount-on-exit')),
})
