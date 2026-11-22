import { createSharedMutationObserver } from '@zag-js/dom-query'
import type * as menu from '@zag-js/menu'
import { str } from '../../utils/attrs.js'
import { definePart, wrapped, wrappedButton, type RootElement, rootOf } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { emit } from '../../utils/events.js'
import { itemSelector, type MenuElement, parents, root, textOf } from './shared.js'

function optionOf(item: HTMLElement): menu.OptionItemProps | null {
  const value = item.getAttribute('value')
  if (value == null) return null
  const base = {
    value,
    disabled: item.hasAttribute('disabled'),
    valueText: textOf(item),
    closeOnSelect: item.getAttribute('close-on-select') === 'false' ? false : undefined,
  }
  const rerender = () => rootOf<RootElement<menu.Api>>(item, root)?.render()

  if (item.localName === 'ark-menu-checkbox-item') {
    return {
      ...base,
      type: 'checkbox',
      checked: item.hasAttribute('checked'),
      onCheckedChange(checked) {
        item.toggleAttribute('checked', checked)
        emit(item, 'checkedchange', { checked })
        rerender()
      },
    }
  }
  const group = item.closest('ark-menu-radio-item-group')
  return {
    ...base,
    type: 'radio',
    checked: group?.getAttribute('value') === value,
    onCheckedChange() {
      group?.setAttribute('value', value)
      if (group) emit(group as HTMLElement, 'valuechange', { value })
      rerender()
    },
  }
}

const itemPropsOf = (item: HTMLElement): menu.ItemProps => ({
  value: item.getAttribute('value') ?? '',
  disabled: item.hasAttribute('disabled'),
  valueText: textOf(item),
  closeOnSelect: item.getAttribute('close-on-select') === 'false' ? false : undefined,
})

const optionStateOf = (api: menu.Api, item: HTMLElement) => {
  const option = optionOf(item)
  return option ? api.getOptionItemState(option) : undefined
}

const itemStateOf = (api: menu.Api, el: HTMLElement) => {
  const item = el.closest<HTMLElement>(itemSelector)
  if (!item) return undefined
  return item.localName === 'ark-menu-item' ? api.getItemState(itemPropsOf(item)) : optionStateOf(api, item)
}

const itemProps =
  (props: (api: menu.Api, item: HTMLElement) => Record<string, any>) => (api: menu.Api, el: HTMLElement) => {
    const item = el.closest<HTMLElement>(itemSelector)
    if (!item) return {}
    return props(api, item)
  }

const optionProps = (props: (api: menu.Api, option: menu.OptionItemProps) => Record<string, any>) =>
  itemProps((api, item) => {
    if (item.localName === 'ark-menu-item') {
      const value = item.getAttribute('value') ?? ''
      return props(api, { value, type: 'checkbox', checked: false })
    }
    const option = optionOf(item)
    return option ? props(api, option) : {}
  })

export const MenuTrigger = definePart<menu.Api, menu.TriggerState>({
  tag: 'ark-menu-trigger',
  root,
  attributes: ['value'],
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
  state: (api, el) => api.getTriggerState({ value: str(el, 'value') }),
})

export const MenuTriggerItem = definePart<menu.Api>({
  tag: 'ark-menu-trigger-item',
  root,
  // Belongs to the submenu, but it's an item of the parent
  props: (api, el) => {
    const child = rootOf<MenuElement>(el, root)
    const parentApi = child && parents.get(child)?.api
    return parentApi ? parentApi.getTriggerItemProps(api) : {}
  },
})

export const MenuContextTrigger = definePart<menu.Api>({
  tag: 'ark-menu-context-trigger',
  root,
  props: (api) => api.getContextTriggerProps(),
})

export const MenuIndicator = definePart<menu.Api>({
  tag: 'ark-menu-indicator',
  root,
  props: (api) => api.getIndicatorProps(),
})

export const MenuPositioner = definePresencePart<menu.Api, menu.PositionerState>({
  tag: 'ark-menu-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
  state: (api) => api.getPositionerState(),
})

export const MenuContent = definePresencePart<menu.Api, menu.ContentState>({
  tag: 'ark-menu-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const MenuArrow = definePart<menu.Api>({ tag: 'ark-menu-arrow', root, props: (api) => api.getArrowProps() })

export const MenuArrowTip = definePart<menu.Api>({
  tag: 'ark-menu-arrow-tip',
  root,
  props: (api) => api.getArrowTipProps(),
})

export const MenuSeparator = definePart<menu.Api>({
  tag: 'ark-menu-separator',
  root,
  props: (api) => api.getSeparatorProps(),
})

const groupProps = (api: menu.Api, el: HTMLElement) => api.getItemGroupProps({ id: el.getAttribute('name') ?? '' })

export const MenuItemGroup = definePart<menu.Api>({
  tag: 'ark-menu-item-group',
  root,
  attributes: ['name'],
  props: groupProps,
})

export const MenuRadioItemGroup = definePart<menu.Api>({
  tag: 'ark-menu-radio-item-group',
  root,
  attributes: ['name', 'value'],
  props: groupProps,
})

export const MenuInput = definePart<menu.Api>({
  tag: 'ark-menu-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

export const MenuList = definePart<menu.Api>({ tag: 'ark-menu-list', root, props: (api) => api.getListProps() })

const itemsObserver = createSharedMutationObserver({ childList: true, subtree: true })

export const MenuEmpty = definePart<menu.Api>({
  tag: 'ark-menu-empty',
  root,
  props: (api, el) => {
    const menuEl = rootOf(el, root)!
    const items = [...menuEl.querySelectorAll(itemSelector)].filter((item) => rootOf(item, root) === menuEl)
    return { ...api.getEmptyProps(), hidden: items.length > 0 }
  },
  setup: (_el, rootEl) => itemsObserver.observe(rootEl, () => rootEl.render()),
})

export const MenuItemGroupLabel = definePart<menu.Api>({
  tag: 'ark-menu-item-group-label',
  root,
  props: (api, el) =>
    api.getItemGroupLabelProps({
      htmlFor: el.closest(':is(ark-menu-item-group, ark-menu-radio-item-group)')?.getAttribute('name') ?? '',
    }),
})

export const MenuItem = definePart<menu.Api, menu.ItemState>({
  tag: 'ark-menu-item',
  root,
  attributes: ['value', 'disabled', 'close-on-select'],
  // A wrapped link becomes the item
  target: wrapped('a'),
  display: 'block',
  props: itemProps((api, item) => api.getItemProps(itemPropsOf(item))),
  state: (api, el) => api.getItemState(itemPropsOf(el)),
})

export const MenuCheckboxItem = definePart<menu.Api, menu.OptionItemState | undefined>({
  tag: 'ark-menu-checkbox-item',
  root,
  attributes: ['value', 'disabled', 'close-on-select', 'checked'],
  display: 'block',
  props: optionProps((api, option) => api.getOptionItemProps(option)),
  state: (api, el) => optionStateOf(api, el),
})

export const MenuRadioItem = definePart<menu.Api, menu.OptionItemState | undefined>({
  tag: 'ark-menu-radio-item',
  root,
  attributes: ['value', 'disabled', 'close-on-select'],
  display: 'block',
  props: optionProps((api, option) => api.getOptionItemProps(option)),
  state: (api, el) => optionStateOf(api, el),
})

export const MenuItemText = definePart<menu.Api, menu.ItemState | menu.OptionItemState | undefined>({
  tag: 'ark-menu-item-text',
  root,
  display: 'block',
  props: optionProps((api, option) => api.getItemTextProps(option)),
  state: (api, el) => itemStateOf(api, el),
})

export const MenuItemIndicator = definePart<menu.Api, menu.ItemState | menu.OptionItemState | undefined>({
  tag: 'ark-menu-item-indicator',
  root,
  display: 'block',
  props: optionProps((api, option) => api.getItemIndicatorProps(option)),
  state: (api, el) => itemStateOf(api, el),
})
