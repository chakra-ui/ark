import type * as steps from '@zag-js/steps'

import { definePart, wrapped } from '../../utils/define.js'
import { itemTag, itemValueOf, root } from './shared.js'

type ItemPropsFn = (api: steps.Api, item: steps.ItemProps) => Record<string, any>
type Target = (el: HTMLElement) => HTMLElement | null

const wrappedButton = wrapped('button')

const defineItemPart = (tag: string, props: ItemPropsFn, target?: Target) =>
  definePart<steps.Api>({
    tag,
    root,
    target,
    props: (api, el) => {
      const value = itemValueOf(el)
      return value == null ? {} : props(api, { value })
    },
  })

definePart<steps.Api>({
  tag: 'ark-steps-list',
  root,
  props: (api) => api.getListProps(),
})

defineItemPart(itemTag, (api, item) => api.getItemProps(item))

defineItemPart('ark-steps-trigger', (api, item) => api.getTriggerProps(item), wrappedButton)

defineItemPart('ark-steps-indicator', (api, item) => api.getIndicatorProps(item))

defineItemPart('ark-steps-separator', (api, item) => api.getSeparatorProps(item))

definePart<steps.Api>({
  tag: 'ark-steps-content',
  root,
  props: (api, el) => api.getContentProps({ value: el.getAttribute('value') ?? '' }),
})

definePart<steps.Api>({
  tag: 'ark-steps-completed-content',
  root,
  props: (api) => api.getCompletedContentProps(),
})

definePart<steps.Api>({
  tag: 'ark-steps-prev-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getPreviousTriggerProps(),
})

definePart<steps.Api>({
  tag: 'ark-steps-next-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getNextTriggerProps(),
})

definePart<steps.Api>({
  tag: 'ark-steps-skip-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getSkipTriggerProps(),
})

definePart<steps.Api>({
  tag: 'ark-steps-progress',
  root,
  props: (api) => api.getProgressProps(),
})
