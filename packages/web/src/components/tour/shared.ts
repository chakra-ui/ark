export const root = 'ark-tour'

export const flag = (el: Element, name: string) =>
  el.hasAttribute(name) ? el.getAttribute(name) !== 'false' : undefined

const authored = new WeakSet<Element>()

export const markAuthored = (el: Element) => {
  if (el.childNodes.length > 0) authored.add(el)
}

export const fillText = (el: Element, text: string | undefined) => {
  if (authored.has(el)) return
  const next = text ?? ''
  if (el.textContent !== next) el.textContent = next
}
