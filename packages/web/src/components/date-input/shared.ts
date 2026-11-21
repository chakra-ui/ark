import * as dateInput from '@zag-js/date-input'

import { num } from '../../utils/attrs.js'

export type Api = dateInput.Api

export const root = 'ark-date-input'

export const segmentGroupTag = 'ark-date-input-segment-group'

export const segmentTag = 'ark-date-input-segment'

export const dates = (el: Element, name: string) => {
  const value = el.getAttribute(name)
  return value ? dateInput.parse(value.split(',').map((item) => item.trim())) : undefined
}

export const date = (el: Element, name: string) => dates(el, name)?.[0]

export const groupIndexOf = (el: Element) => {
  const group = el.closest(segmentGroupTag)
  return group ? num(group, 'index') : undefined
}

/** The segment each stamped node renders. */
export const segments = new WeakMap<Element, dateInput.DateSegment>()
