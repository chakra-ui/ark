import type * as toast from '@zag-js/toast'
import { definePart, wrappedButton } from '../../utils/define.js'
import { entries, root } from './shared.js'

// Empty parts are filled from the toast; authored text wins. Icons may sit beside the managed text node.
const texts = new WeakMap<HTMLElement, Text>()

function autoText(el: HTMLElement) {
  if (el.textContent?.trim()) return
  const text = document.createTextNode('')
  el.append(text)
  texts.set(el, text)
}

function fillText(el: HTMLElement | null, value: unknown) {
  const text = el && texts.get(el)
  if (!el || !text) return
  const data = value == null ? '' : String(value)
  // Content mutations re-measure the toast, so only touch the DOM on change
  if (text.data !== data) text.data = data
  el.hidden = !data
}

const actionOf = (el: HTMLElement) => entries.get(el.closest(root)!)?.toast.action

definePart<toast.Api>({
  tag: 'ark-toast-content',
  root,
  props: (api) => api.getContentProps(),
})

definePart<toast.Api>({
  tag: 'ark-toast-title',
  root,
  setup: autoText,
  props: (api) => api.getTitleProps(),
  render: (api, el) => fillText(el, api.title),
})

definePart<toast.Api>({
  tag: 'ark-toast-description',
  root,
  setup: autoText,
  props: (api) => api.getDescriptionProps(),
  render: (api, el) => fillText(el, api.description),
})

definePart<toast.Api>({
  tag: 'ark-toast-action-trigger',
  root,
  target: wrappedButton,
  setup: (el) => {
    const button = wrappedButton(el)
    if (button) autoText(button)
  },
  props: (api) => api.getActionTriggerProps(),
  render: (_api, el) => {
    const action = actionOf(el)
    fillText(wrappedButton(el), action?.label)
    el.hidden = !action
  },
})

definePart<toast.Api>({
  tag: 'ark-toast-close-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCloseTriggerProps(),
  render: (api, el) => {
    el.hidden = !api.closable
  },
})
