import { numbers, positioning, str } from '../../utils/attrs.js'
export const root = 'ark-tooltip'

export function positioningOf(el: Element) {
  const [mainAxis, crossAxis] = numbers(el, 'offset') ?? []
  const strategy = str<'absolute' | 'fixed'>(el, 'strategy')
  return {
    ...positioning(el),
    ...(mainAxis != null && { offset: { mainAxis, crossAxis } }),
    ...(strategy && { strategy }),
  }
}

export // Also reaches through another part's wrapper, e.g. a dialog trigger's button or a checkbox's label
const triggerTarget = (el: HTMLElement) =>
  el.querySelector<HTMLElement>(':scope > :is(button, a, ark-menu-item), :scope > * > :is(button, a, label)')
