import { numbers, positioning, str } from '../../utils/attrs.js'
export const root = 'ark-popover'

export const focusEl = (el: Element, name: string) => {
  const selector = str(el, name)
  return selector
    ? () =>
        el.querySelector<HTMLElement>(selector) ?? (el.getRootNode() as ParentNode).querySelector<HTMLElement>(selector)
    : undefined
}

export function positioningOf(el: Element) {
  const [mainAxis, crossAxis] = numbers(el, 'offset') ?? []
  const flip = str(el, 'flip')
  return {
    ...positioning(el),
    ...(mainAxis != null && { offset: { mainAxis, crossAxis } }),
    ...(flip && { flip: flip === 'false' ? false : flip.split(',').map((placement) => placement.trim()) }),
  }
}
