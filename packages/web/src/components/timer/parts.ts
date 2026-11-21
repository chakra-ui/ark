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

definePart<timer.Api>({
  tag: 'ark-timer-area',
  root,
  props: (api) => api.getAreaProps(),
})

definePart<timer.Api>({
  tag: 'ark-timer-item',
  root,
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

definePart<timer.Api>({
  tag: 'ark-timer-separator',
  root,
  props: (api) => api.getSeparatorProps(),
})

definePart<timer.Api>({
  tag: 'ark-timer-control',
  root,
  props: (api) => api.getControlProps(),
})

definePart<timer.Api>({
  tag: 'ark-timer-action-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => {
    const action = actionOf(el)
    return action ? api.getActionTriggerProps({ action }) : {}
  },
})
