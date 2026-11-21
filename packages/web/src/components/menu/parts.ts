import type * as menu from '@zag-js/menu'
import { str } from '../../utils/attrs.js'
import { definePart, wrapped, wrappedButton, type RootElement } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { emit } from '../../utils/events.js'
import { filteredOut, itemSelector, type MenuElement, parents, queries, root, textOf } from './shared.js'

function optionOf(item: HTMLElement): menu.OptionItemProps | null {
  const value = item.getAttribute('value')
  if (value == null) return null
  const base = {
    value,
    disabled: item.hasAttribute('disabled'),
    valueText: textOf(item),
    closeOnSelect: item.getAttribute('close-on-select') === 'false' ? false : undefined,
  }
  const rerender = () => item.closest<RootElement<menu.Api>>(root)?.render()

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

const itemPart = (
  tag: string,
  props: (api: menu.Api, item: HTMLElement) => Record<string, any>,
  target?: (el: HTMLElement) => HTMLElement | null,
) =>
  definePart<menu.Api>({
    tag,
    root,
    target,
    display: 'block',
    props: (api, el) => {
      const item = el.closest<HTMLElement>(itemSelector)
      if (!item) return {}
      // Without item attributes, navigation skips it
      if (item === el && filteredOut(item)) return { hidden: true }
      return props(api, item)
    },
  })

const optionPart = (tag: string, props: (api: menu.Api, option: menu.OptionItemProps) => Record<string, any>) =>
  itemPart(tag, (api, item) => {
    if (item.localName === 'ark-menu-item') {
      const value = item.getAttribute('value') ?? ''
      return props(api, { value, type: 'checkbox', checked: false })
    }
    const option = optionOf(item)
    return option ? props(api, option) : {}
  })

definePart<menu.Api>({
  tag: 'ark-menu-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
})

definePart<menu.Api>({
  tag: 'ark-menu-trigger-item',
  root,
  // Belongs to the submenu, but it's an item of the parent
  props: (api, el) => {
    const child = el.closest<MenuElement>(root)
    const parentApi = child && parents.get(child)?.api
    return parentApi ? parentApi.getTriggerItemProps(api) : {}
  },
})

definePart<menu.Api>({ tag: 'ark-menu-context-trigger', root, props: (api) => api.getContextTriggerProps() })

definePart<menu.Api>({ tag: 'ark-menu-indicator', root, props: (api) => api.getIndicatorProps() })

definePresencePart<menu.Api>({
  tag: 'ark-menu-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

definePresencePart<menu.Api>({ tag: 'ark-menu-content', root, props: (api) => api.getContentProps() })

definePart<menu.Api>({ tag: 'ark-menu-arrow', root, props: (api) => api.getArrowProps() })

definePart<menu.Api>({ tag: 'ark-menu-arrow-tip', root, props: (api) => api.getArrowTipProps() })

definePart<menu.Api>({ tag: 'ark-menu-separator', root, props: (api) => api.getSeparatorProps() })

const groupProps = (api: menu.Api, el: HTMLElement) => {
  const items = [...el.querySelectorAll(itemSelector)]
  return {
    ...api.getItemGroupProps({ id: el.getAttribute('name') ?? '' }),
    hidden: items.length > 0 && items.every(filteredOut),
  }
}

definePart<menu.Api>({ tag: 'ark-menu-item-group', root, props: groupProps })

definePart<menu.Api>({ tag: 'ark-menu-radio-item-group', root, props: groupProps })

definePart<menu.Api>({
  tag: 'ark-menu-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
  setup: (el, rootEl) => {
    const onInput = (event: Event) => {
      queries.set(rootEl, (event.target as HTMLInputElement).value)
      rootEl.render()
    }
    el.addEventListener('input', onInput)
    return () => el.removeEventListener('input', onInput)
  },
})

definePart<menu.Api>({ tag: 'ark-menu-list', root, props: (api) => api.getListProps() })

definePart<menu.Api>({
  tag: 'ark-menu-empty',
  root,
  props: (api, el) => {
    const menuEl = el.closest(root)!
    const items = [...menuEl.querySelectorAll(itemSelector)].filter((item) => item.closest(root) === menuEl)
    return { ...api.getEmptyProps(), hidden: !items.every(filteredOut) }
  },
})

definePart<menu.Api>({
  tag: 'ark-menu-item-group-label',
  root,
  props: (api, el) =>
    api.getItemGroupLabelProps({
      htmlFor: el.closest(':is(ark-menu-item-group, ark-menu-radio-item-group)')?.getAttribute('name') ?? '',
    }),
})

itemPart(
  'ark-menu-item',
  (api, item) =>
    api.getItemProps({
      value: item.getAttribute('value') ?? '',
      disabled: item.hasAttribute('disabled'),
      valueText: textOf(item),
      closeOnSelect: item.getAttribute('close-on-select') === 'false' ? false : undefined,
    }),
  // A wrapped link becomes the item
  wrapped('a'),
)

optionPart('ark-menu-checkbox-item', (api, option) => api.getOptionItemProps(option))

optionPart('ark-menu-radio-item', (api, option) => api.getOptionItemProps(option))

optionPart('ark-menu-item-text', (api, option) => api.getItemTextProps(option))

optionPart('ark-menu-item-indicator', (api, option) => api.getItemIndicatorProps(option))
