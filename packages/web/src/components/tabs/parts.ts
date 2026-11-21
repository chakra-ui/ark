import type * as tabs from '@zag-js/tabs'
import { definePart, wrappedButton } from '../../utils/define.js'
import { mountTemplate } from '../../utils/lazy.js'
import { root } from './shared.js'

const itemValue = (el: HTMLElement) => el.getAttribute('value') ?? ''

definePart<tabs.Api>({ tag: 'ark-tabs-list', root, props: (api) => api.getListProps() })

definePart<tabs.Api>({
  tag: 'ark-tabs-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps({ value: itemValue(el), disabled: el.hasAttribute('disabled') }),
})

definePart<tabs.Api>({
  tag: 'ark-tabs-content',
  root,
  props: (api, el) => api.getContentProps({ value: itemValue(el) }),
  render: (api, el) => mountTemplate(el, api.value === itemValue(el), !!el.closest(`${root}[unmount-on-exit]`)),
})

definePart<tabs.Api>({ tag: 'ark-tabs-indicator', root, props: (api) => api.getIndicatorProps() })
