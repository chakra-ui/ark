const labels = new WeakSet<Element>()
const linked = new WeakMap<Element, Element>()
const owned = new WeakMap<Element, Set<string>>()
const listening = new WeakSet<Document>()

const labelable = 'button, input, meter, output, progress, select, textarea'
const interactive =
  'a[href], button, input, select, textarea, summary, label, [contenteditable], [role=button], [tabindex]'

const textEntry = (el: Element) =>
  el.localName === 'textarea' ||
  (el.localName === 'input' &&
    !/^(button|checkbox|color|file|image|radio|range|reset|submit)$/.test((el as HTMLInputElement).type))

const hidden = (el: Element) =>
  el.matches('[hidden], [aria-hidden=true], input[type=hidden]') || el.closest('[aria-hidden=true]') !== null

function controlOf(label: Element) {
  const id = label.getAttribute('for')
  if (!id) return null
  const root = label.getRootNode() as Document | ShadowRoot
  const control = root.getElementById?.(id) ?? null
  return control && !hidden(control) ? control : null
}

function activate(event: MouseEvent, path: EventTarget[], label: Element) {
  if (event.defaultPrevented) return
  const control = controlOf(label) as HTMLElement | null
  if (!control || path.includes(control) || !control.matches(labelable)) return
  const inner = path.slice(0, path.indexOf(label))
  if (inner.some((node) => node instanceof Element && node.matches(interactive))) return
  if (textEntry(control)) control.focus()
  else control.click()
}

function onClick(event: MouseEvent) {
  const path = event.composedPath()
  const label = path.find((node): node is Element => node instanceof Element && labels.has(node))
  if (label) setTimeout(() => activate(event, path, label))
}

function release(label: Element, control: Element) {
  const ids = owned.get(control)
  if (!ids?.delete(label.id)) return
  const rest = (control.getAttribute('aria-labelledby') ?? '').split(' ').filter((id) => id && id !== label.id)
  if (rest.length) control.setAttribute('aria-labelledby', rest.join(' '))
  else control.removeAttribute('aria-labelledby')
}

function link(label: HTMLElement) {
  const control = controlOf(label)
  const previous = linked.get(label)
  if (previous && previous !== control) {
    release(label, previous)
    linked.delete(label)
  }
  if (!control || previous === control || control.hasAttribute('aria-label')) return
  const ids = owned.get(control) ?? new Set<string>()
  const current = (control.getAttribute('aria-labelledby') ?? '').split(' ').filter(Boolean)
  if (current.some((id) => !ids.has(id))) return
  if (!label.id) label.id = `${control.id}:label`
  ids.add(label.id)
  owned.set(control, ids)
  control.setAttribute('aria-labelledby', [...current, label.id].join(' '))
  linked.set(label, control)
}

function unlink(label: HTMLElement) {
  const control = linked.get(label)
  linked.delete(label)
  labels.delete(label)
  if (control) release(label, control)
}

export function linkLabel(node: HTMLElement): VoidFunction | undefined {
  if (!node.hasAttribute('for') || node.closest('label')) return
  labels.add(node)
  const doc = node.ownerDocument
  if (!listening.has(doc)) {
    listening.add(doc)
    doc.addEventListener('click', onClick, { capture: true })
  }
  link(node)
  return () => unlink(node)
}
