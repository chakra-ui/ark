import type * as steps from '@zag-js/steps'

import { rootOf } from '../../utils/define.js'

export const root = 'ark-steps'

export const itemTag = 'ark-steps-item'

export const itemAttributes = ['value', 'disabled', 'optional', 'editable', 'invalid']

const toItem = (el: Element): steps.StepItem => ({
  value: el.getAttribute('value') ?? '',
  disabled: el.hasAttribute('disabled'),
  optional: el.hasAttribute('optional'),
  editable: el.getAttribute('editable') !== 'false',
  invalid: el.hasAttribute('invalid'),
})

export const readItems = (el: HTMLElement): steps.StepItem[] => {
  const items = Array.from(el.querySelectorAll(itemTag)).filter((item) => rootOf(item, root) === el)
  return items.map(toItem)
}

export const itemValueOf = (part: Element) => part.closest(itemTag)?.getAttribute('value') ?? null
