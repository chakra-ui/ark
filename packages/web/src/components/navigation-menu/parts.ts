import type * as navigationMenu from '@zag-js/navigation-menu'
import { spreadProps } from '@zag-js/vanilla'

import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { contentValueOf, itemTag, itemValueOf, root } from './shared.js'

type Align = navigationMenu.ViewportProps['align']

const itemPropsOf = (el: Element) => {
  const item = el.closest(itemTag)
  return { value: itemValueOf(el), disabled: item?.hasAttribute('disabled') || undefined }
}

const linkValueOf = (el: HTMLElement) => {
  const content = el.closest<HTMLElement>('ark-navigation-menu-content')
  return content ? contentValueOf(content) : itemValueOf(el)
}

const alignOf = (el: Element) =>
  (el.closest('ark-navigation-menu-viewport-positioner')?.getAttribute('align') ?? undefined) as Align

definePart<navigationMenu.Api>({
  tag: 'ark-navigation-menu-list',
  root,
  props: (api) => api.getListProps(),
})

definePart<navigationMenu.Api>({
  tag: itemTag,
  root,
  props: (api, el) => api.getItemProps(itemPropsOf(el)),
})

definePart<navigationMenu.Api>({
  tag: 'ark-navigation-menu-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps(itemPropsOf(el)),
})

definePart<navigationMenu.Api>({
  tag: 'ark-navigation-menu-link',
  root,
  target: wrapped('a'),
  props: (api, el) =>
    api.getLinkProps({
      value: el.getAttribute('value') ?? linkValueOf(el),
      current: el.hasAttribute('current'),
      closeOnClick: el.hasAttribute('close-on-click') ? el.getAttribute('close-on-click') !== 'false' : undefined,
    }),
})

definePart<navigationMenu.Api>({
  tag: 'ark-navigation-menu-item-indicator',
  root,
  props: (api, el) => api.getItemIndicatorProps(itemPropsOf(el)),
})

definePart<navigationMenu.Api>({
  tag: 'ark-navigation-menu-arrow',
  root,
  props: (api) => api.getArrowProps(),
})

definePresencePart<navigationMenu.Api>({
  tag: 'ark-navigation-menu-indicator',
  root,
  present: (api) => api.open,
  props: (api) => api.getIndicatorProps(),
})

definePart<navigationMenu.Api>({
  tag: 'ark-navigation-menu-viewport-positioner',
  root,
  props: (api, el) => api.getViewportPositionerProps({ align: alignOf(el) }),
})

definePresencePart<navigationMenu.Api>({
  tag: 'ark-navigation-menu-viewport',
  root,
  present: (api) => api.open,
  props: (api, el) => api.getViewportProps({ align: alignOf(el) }),
})

const proxies = new WeakMap<HTMLElement, [HTMLElement, HTMLElement]>()

const moveIntoViewport = (api: navigationMenu.Api, el: HTMLElement, id: string) => {
  const viewport = api.isViewportRendered ? api.getViewportNode() : null
  if (!viewport) return
  const value = contentValueOf(el)
  let pair = proxies.get(el)
  if (!pair) {
    pair = [document.createElement('div'), document.createElement('div')]
    proxies.set(el, pair)
  }
  if (el.parentElement !== viewport) {
    el.before(...pair)
    viewport.append(el)
  }
  spreadProps(pair[0], api.getViewportProxyProps({ value }), id)
  spreadProps(pair[1], api.getTriggerProxyProps({ value }), id)
}

definePresencePart<navigationMenu.Api>({
  tag: 'ark-navigation-menu-content',
  root,
  present: (api, el) => api.value === contentValueOf(el),
  props: (api, el) => api.getContentProps({ value: contentValueOf(el) }),
  render: (api, el) => moveIntoViewport(api, el, el.closest(root)?.id ?? ''),
})
