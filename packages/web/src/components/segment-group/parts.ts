import type * as segmentGroup from '@zag-js/radio-group'

import { definePart, ownInput, wrapped } from '../../utils/define.js'
import { itemTag, root } from './shared.js'

type ItemPropsFn = (api: segmentGroup.Api, item: segmentGroup.ItemProps) => Record<string, any>
type Target = (el: HTMLElement) => HTMLElement | null

const itemOf = (part: HTMLElement): segmentGroup.ItemProps | null => {
  const item = part.closest(itemTag)
  const value = item?.getAttribute('value')
  if (!item || value == null) return null

  return {
    value,
    disabled: item.hasAttribute('disabled'),
    invalid: item.hasAttribute('invalid'),
  }
}

const defineItemPart = (tag: string, props: ItemPropsFn, target?: Target, attributes?: string[]) =>
  definePart<segmentGroup.Api, segmentGroup.ItemState | undefined>({
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

export const SegmentGroupLabel = definePart<segmentGroup.Api>({
  tag: 'ark-segment-group-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const SegmentGroupIndicator = definePart<segmentGroup.Api>({
  tag: 'ark-segment-group-indicator',
  root,
  props: (api) => api.getIndicatorProps(),
})

export const SegmentGroupItem = defineItemPart(itemTag, (api, item) => api.getItemProps(item), wrapped('label'), [
  'value',
  'disabled',
  'invalid',
])

export const SegmentGroupItemText = defineItemPart('ark-segment-group-item-text', (api, item) =>
  api.getItemTextProps(item),
)

export const SegmentGroupItemControl = defineItemPart('ark-segment-group-item-control', (api, item) =>
  api.getItemControlProps(item),
)

export const SegmentGroupItemHiddenInput = defineItemPart(
  'ark-segment-group-item-hidden-input',
  (api, item) => api.getItemHiddenInputProps(item),
  ownInput,
)
