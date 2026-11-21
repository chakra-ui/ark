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
) =>
  definePart<radio.Api>({
    tag,
    root,
    target,
    props: (api, el) => {
      const item = itemOf(el)
      return item ? props(api, item) : {}
    },
  })

definePart<radio.Api>({ tag: 'ark-radio-group-label', root, props: (api) => api.getLabelProps() })

definePart<radio.Api>({ tag: 'ark-radio-group-indicator', root, props: (api) => api.getIndicatorProps() })

itemPart(itemTag, (api, item) => api.getItemProps(item), wrapped('label'))

itemPart('ark-radio-group-item-text', (api, item) => api.getItemTextProps(item))

itemPart('ark-radio-group-item-control', (api, item) => api.getItemControlProps(item))

itemPart('ark-radio-group-item-hidden-input', (api, item) => api.getItemHiddenInputProps(item), ownInput)
