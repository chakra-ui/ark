export const number = (el: Element, name: string) => {
  const value = el.getAttribute(name)
  return value == null || value === '' ? undefined : Number(value)
}

export const defined = <T extends object>(options: T) =>
  Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined)) as Partial<T>

export const contentOf = (el: HTMLElement, tag: string) => {
  const existing = el.querySelector<HTMLElement>(`:scope > ${tag}`)
  if (existing) return existing

  const content = document.createElement(tag)
  el.append(content)

  return content
}

export const templateOf = (content: HTMLElement) => content.querySelector<HTMLTemplateElement>(':scope > template')

function createItem(template: HTMLTemplateElement | null, tag: string) {
  const element = template?.content.firstElementChild?.cloneNode(true)
  return element instanceof HTMLElement ? element : document.createElement(tag)
}

export function reuse(
  element: HTMLElement | undefined,
  template: HTMLTemplateElement | null,
  tag: string,
  index: string,
) {
  const next = element ?? createItem(template, tag)
  const fresh = next.dataset.index !== index
  next.dataset.index = index

  return { element: next, fresh }
}

export const composed = (el: HTMLElement) => el.parentElement?.hasAttribute('as-child') ?? false
