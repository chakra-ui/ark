import type * as accordion from '@zag-js/accordion'
import { mergeProps } from '@zag-js/vanilla'
import { definePart, type PartElement, type RootElement, wrappedButton } from '../../utils/define.js'
import { itemCollapsible, stopItemCollapsible, withoutVisibility } from '../../utils/item-collapsible.js'
import { mountTemplate } from '../../utils/lazy.js'
import { contentTag, itemPropsOf, itemTag, root } from './shared.js'

function collapsibleOf(item: HTMLElement, api: accordion.Api, props: accordion.ItemProps) {
  const rootEl = item.closest<RootElement<accordion.Api>>(root)!
  const collapsible = itemCollapsible(
    item,
    () => ({
      id: `${rootEl.machineId}:item:${props.value}`,
      contentId: api.getItemContentProps(props).id,
      open: api.getItemState(props).expanded,
    }),
    () => {
      if (!rootEl.api) return
      ;(item as PartElement<accordion.Api>).update(rootEl.api)
      item.querySelector<PartElement<accordion.Api>>(contentTag)?.update(rootEl.api)
    },
  )
  collapsible.sync(api.getItemState(props).expanded)
  return collapsible.api()
}

const itemPart = (tag: string, props: (api: accordion.Api, item: accordion.ItemProps) => Record<string, any>) =>
  definePart<accordion.Api>({
    tag,
    root,
    props: (api, el) => {
      const item = itemPropsOf(el)
      return item ? props(api, item) : {}
    },
  })

definePart<accordion.Api>({
  tag: itemTag,
  root,
  setup: (el) => () => stopItemCollapsible(el),
  props: (api, el) => {
    const item = itemPropsOf(el)
    if (!item) return {}
    return mergeProps(collapsibleOf(el, api, item).getRootProps(), api.getItemProps(item))
  },
})

itemPart('ark-accordion-item-header', (api, item) => api.getItemHeaderProps(item))

definePart<accordion.Api>({
  tag: 'ark-accordion-item-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => {
    const item = itemPropsOf(el)
    if (!item) return {}
    const props = api.getItemTriggerProps(item)
    const content = el.closest(itemTag)?.querySelector(contentTag)
    const unmounted = content?.querySelector(':scope > template') && !content.querySelector(':scope > :not(template)')
    return unmounted ? { ...props, 'aria-controls': undefined } : props
  },
})

itemPart('ark-accordion-item-indicator', (api, item) => api.getItemIndicatorProps(item))

definePart<accordion.Api>({
  tag: contentTag,
  root,
  props: (api, el) => {
    const item = itemPropsOf(el)
    const itemEl = el.closest<HTMLElement>(itemTag)
    if (!item || !itemEl) return {}
    const collapsible = collapsibleOf(itemEl, api, item)
    return mergeProps(collapsible.getContentProps(), withoutVisibility(api.getItemContentProps(item)))
  },
  render: (api, el) => {
    const item = itemPropsOf(el)
    const itemEl = el.closest<HTMLElement>(itemTag)
    if (!item || !itemEl) return
    const visible = collapsibleOf(itemEl, api, item).visible
    mountTemplate(el, visible, !!el.closest(root)?.hasAttribute('unmount-on-exit'))
  },
})
