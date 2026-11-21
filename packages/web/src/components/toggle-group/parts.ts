import type * as toggleGroup from '@zag-js/toggle-group'
import { definePart, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'

const itemProps = (el: HTMLElement) => ({
  value: el.getAttribute('value') ?? '',
  disabled: el.hasAttribute('disabled'),
})

export const ToggleGroupItem = definePart<toggleGroup.Api, toggleGroup.ItemState>({
  tag: 'ark-toggle-group-item',
  root,
  attributes: ['value', 'disabled'],
  target: wrappedButton,
  props: (api, el) => api.getItemProps(itemProps(el)),
  state: (api, el) => api.getItemState(itemProps(el)),
})
