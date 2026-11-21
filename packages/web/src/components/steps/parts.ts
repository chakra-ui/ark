import type * as steps from '@zag-js/steps'

import { definePart, wrapped } from '../../utils/define.js'
import { itemAttributes, itemTag, itemValueOf, root } from './shared.js'

const wrappedButton = wrapped('button')

const itemOf = (el: HTMLElement): steps.ItemProps | undefined => {
  const value = itemValueOf(el)
  return value == null ? undefined : { value }
}

const contentOf = (el: HTMLElement): steps.ItemProps => ({ value: el.getAttribute('value') ?? '' })

const itemStateOf = (api: steps.Api, el: HTMLElement) => {
  const item = itemOf(el)
  return item ? api.getItemState(item) : undefined
}

export const StepsList = definePart<steps.Api>({
  tag: 'ark-steps-list',
  root,
  props: (api) => api.getListProps(),
})

export const StepsItem = definePart<steps.Api, steps.ItemState | undefined>({
  tag: itemTag,
  root,
  attributes: itemAttributes,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getItemProps(item) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})

export const StepsTrigger = definePart<steps.Api, steps.ItemState | undefined>({
  tag: 'ark-steps-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getTriggerProps(item) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})

export const StepsIndicator = definePart<steps.Api, steps.ItemState | undefined>({
  tag: 'ark-steps-indicator',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getIndicatorProps(item) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})

export const StepsSeparator = definePart<steps.Api, steps.ItemState | undefined>({
  tag: 'ark-steps-separator',
  root,
  props: (api, el) => {
    const item = itemOf(el)
    return item ? api.getSeparatorProps(item) : {}
  },
  state: (api, el) => itemStateOf(api, el),
})

export const StepsContent = definePart<steps.Api, steps.ItemState>({
  tag: 'ark-steps-content',
  root,
  attributes: ['value'],
  props: (api, el) => api.getContentProps(contentOf(el)),
  state: (api, el) => api.getItemState(contentOf(el)),
})

export const StepsCompletedContent = definePart<steps.Api>({
  tag: 'ark-steps-completed-content',
  root,
  props: (api) => api.getCompletedContentProps(),
})

export const StepsPrevTrigger = definePart<steps.Api>({
  tag: 'ark-steps-prev-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getPreviousTriggerProps(),
})

export const StepsNextTrigger = definePart<steps.Api>({
  tag: 'ark-steps-next-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getNextTriggerProps(),
})

export const StepsSkipTrigger = definePart<steps.Api>({
  tag: 'ark-steps-skip-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getSkipTriggerProps(),
})

export const StepsProgress = definePart<steps.Api>({
  tag: 'ark-steps-progress',
  root,
  props: (api) => api.getProgressProps(),
})
