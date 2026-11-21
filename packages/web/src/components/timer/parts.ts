import type * as timer from '@zag-js/timer'

import { definePart, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'

const timeParts: readonly timer.TimePart[] = ['days', 'hours', 'minutes', 'seconds', 'milliseconds']

const actions: readonly timer.TimerAction[] = ['start', 'pause', 'resume', 'reset', 'restart']

const itemType = (el: HTMLElement) => {
  const type = el.getAttribute('type') as timer.TimePart | null
  return type && timeParts.includes(type) ? type : null
}

const actionOf = (el: HTMLElement) => {
  const action = el.getAttribute('action') as timer.TimerAction | null
  return action && actions.includes(action) ? action : null
}

export const TimerArea = definePart<timer.Api>({
  tag: 'ark-timer-area',
  root,
  props: (api) => api.getAreaProps(),
})

export const TimerItem = definePart<timer.Api>({
  tag: 'ark-timer-item',
  root,
  attributes: ['type'],
  props: (api, el) => {
    const type = itemType(el)
    return type ? api.getItemProps({ type }) : {}
  },

  render: (api, el) => {
    const type = itemType(el)
    const text = type ? api.formattedTime[type] : ''
    if (el.textContent !== text) el.textContent = text
  },
})

export const TimerSeparator = definePart<timer.Api>({
  tag: 'ark-timer-separator',
  root,
  props: (api) => api.getSeparatorProps(),
})

export const TimerControl = definePart<timer.Api>({
  tag: 'ark-timer-control',
  root,
  props: (api) => api.getControlProps(),
})

export const TimerActionTrigger = definePart<timer.Api, timer.ActionTriggerState | undefined>({
  tag: 'ark-timer-action-trigger',
  root,
  attributes: ['action'],
  target: wrappedButton,
  props: (api, el) => {
    const action = actionOf(el)
    return action ? api.getActionTriggerProps({ action }) : {}
  },
  state: (api, el) => {
    const action = actionOf(el)
    return action ? api.getActionTriggerState({ action }) : undefined
  },
})
