import type * as radio from '@zag-js/radio-group'
import { definePart, ownInput, wrapped } from '../../utils/define.js'
import { itemTag, root } from './shared.js'

const itemOf = (part: HTMLElement): radio.ItemProps | null => {
  const item = part.closest(itemTag)
  const value = item?.getAttribute('value')
  return value == null
    ? null
    : { value, disabled: item!.hasAttribute('disabled'), invalid: item!.hasAttribute('invalid') }
}

const itemPart = (
  tag: string,
  props: (api: radio.Api, item: radio.ItemProps) => Record<string, any>,
  target?: (el: HTMLElement) => HTMLElement | null,
  attributes?: string[],
) =>
  definePart<radio.Api, radio.ItemState | undefined>({
    tag,
    root,
    attributes,
    target,
    props: (api, el) => {
      const item = itemOf(el)
      return item ? props(api, item) : {}
    },
    state: (api, el) => {
      const item = itemOf(el)
      return item ? api.getItemState(item) : undefined
    },
  })

export const RadioGroupLabel = definePart<radio.Api>({
  tag: 'ark-radio-group-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const RadioGroupIndicator = definePart<radio.Api>({
  tag: 'ark-radio-group-indicator',
  root,
  props: (api) => api.getIndicatorProps(),
})

export const RadioGroupItem = itemPart(itemTag, (api, item) => api.getItemProps(item), wrapped('label'), [
  'value',
  'disabled',
  'invalid',
])

export const RadioGroupItemText = itemPart('ark-radio-group-item-text', (api, item) => api.getItemTextProps(item))

export const RadioGroupItemControl = itemPart('ark-radio-group-item-control', (api, item) =>
  api.getItemControlProps(item),
)

export const RadioGroupItemHiddenInput = itemPart(
  'ark-radio-group-item-hidden-input',
  (api, item) => api.getItemHiddenInputProps(item),
  ownInput,
)
