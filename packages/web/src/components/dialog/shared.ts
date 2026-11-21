import { str } from '../../utils/attrs.js'
export const root = 'ark-dialog'

export const focusEl = (el: Element, name: string) => {
  const selector = str(el, name)
  return selector
    ? () =>
        el.querySelector<HTMLElement>(selector) ?? (el.getRootNode() as ParentNode).querySelector<HTMLElement>(selector)
    : undefined
}
