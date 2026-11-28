import type * as accordion from '@zag-js/accordion'
import { mergeProps } from '@zag-js/vanilla'
import { definePart, type PartElement, type RootElement, wrappedButton, rootOf } from '../../utils/define.js'
import { itemCollapsible, stopItemCollapsible, withoutVisibility } from '../../utils/item-collapsible.js'
import { mountTemplate } from '../../utils/lazy.js'
import { contentTag, itemPropsOf, itemTag, root } from './shared.js'

function collapsibleOf(item: HTMLElement, api: accordion.Api, props: accordion.ItemProps) {
  const rootEl = rootOf<RootElement<accordion.Api>>(item, root)!
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

const itemStateOf = (api: accordion.Api, el: HTMLElement) => {
  const item = itemPropsOf(el)
  return item ? api.getItemState(item) : undefined
}

const itemPart = (tag: string, props: (api: accordion.Api, item: accordion.ItemProps) => Record<string, any>) =>
  definePart<accordion.Api, accordion.ItemState | undefined>({
    tag,
    root,
    props: (api, el) => {
      const item = itemPropsOf(el)
      return item ? props(api, item) : {}
    },
    state: itemStateOf,
  })

export const AccordionItem = definePart<accordion.Api, accordion.ItemState | undefined>({
  tag: itemTag,
  root,
  attributes: ['value', 'disabled'],
  setup: (el) => () => stopItemCollapsible(el),
  props: (api, el) => {
    const item = itemPropsOf(el)
    if (!item) return {}
    return mergeProps(collapsibleOf(el, api, item).getRootProps(), api.getItemProps(item))
  },
  state: itemStateOf,
})

export const AccordionItemHeader = itemPart('ark-accordion-item-header', (api, item) => api.getItemHeaderProps(item))

export const AccordionItemTrigger = definePart<accordion.Api, accordion.ItemState | undefined>({
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
  state: itemStateOf,
})

export const AccordionItemIndicator = itemPart('ark-accordion-item-indicator', (api, item) =>
  api.getItemIndicatorProps(item),
)

export const AccordionItemContent = definePart<accordion.Api, accordion.ItemState | undefined>({
  tag: contentTag,
  root,
  props: (api, el) => {
    const item = itemPropsOf(el)
    const itemEl = el.closest<HTMLElement>(itemTag)
    if (!item || !itemEl) return {}
    const collapsible = collapsibleOf(itemEl, api, item)
    return mergeProps(collapsible.getContentProps(), withoutVisibility(api.getItemContentProps(item)))
  },
  state: itemStateOf,
  render: (api, el) => {
    const item = itemPropsOf(el)
    const itemEl = el.closest<HTMLElement>(itemTag)
    if (!item || !itemEl) return
    const visible = collapsibleOf(itemEl, api, item).visible
    if (mountTemplate(el, visible, !!rootOf(el, root)?.hasAttribute('unmount-on-exit'))) {
      itemEl.querySelector<PartElement<accordion.Api>>('ark-accordion-item-trigger')?.update(api)
    }
  },
})
