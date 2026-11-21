import type * as rating from '@zag-js/rating-group'
import { definePart, ownInput } from '../../utils/define.js'
import { repeat, templateOf } from '../../utils/repeat.js'
import { indexOf, itemTag, root } from './shared.js'

const dataAttr = (value: boolean) => (value ? '' : undefined)

export const RatingGroupLabel = definePart<rating.Api>({
  tag: 'ark-rating-group-label',
  root,
  props: (api) => api.getLabelProps(),
})

// Items are stamped from the control's `<template>`, one per `api.items`, so `count` stays the single source
export const RatingGroupControl = definePart<rating.Api>({
  tag: 'ark-rating-group-control',
  root,
  props: (api) => api.getControlProps(),
  render: (api, el) => {
    const template = templateOf(el)
    if (template) repeat(template, api.items, String, (node, index) => node.setAttribute('index', String(index)))
  },
})

export const RatingGroupItem = definePart<rating.Api, rating.ItemState>({
  tag: itemTag,
  root,
  attributes: ['index'],
  props: (api, el) => api.getItemProps({ index: indexOf(el) }),
  state: (api, el) => api.getItemState({ index: indexOf(el) }),
})

// Mirrors the item's state onto its visual, so indicator styles can key off it
export const RatingGroupItemIndicator = definePart<rating.Api, rating.ItemState>({
  tag: 'ark-rating-group-item-indicator',
  root,
  props: (api, el) => {
    const state = api.getItemState({ index: indexOf(el) })
    return {
      'data-highlighted': dataAttr(state.highlighted),
      'data-half': dataAttr(state.half),
      'data-checked': dataAttr(state.checked),
    }
  },
  state: (api, el) => api.getItemState({ index: indexOf(el) }),
})

export const RatingGroupHiddenInput = definePart<rating.Api>({
  tag: 'ark-rating-group-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})
