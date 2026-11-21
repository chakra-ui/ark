export const root = 'ark-floating-panel'

export const flag = (el: Element, name: string) =>
  el.hasAttribute(name) ? el.getAttribute(name) !== 'false' : undefined
