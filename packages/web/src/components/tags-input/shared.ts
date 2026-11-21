import type { RootElement } from '../../utils/define.js'

export const root = 'ark-tags-input'

export const listOf = (el: Element, name: string) => {
  const attr = el.getAttribute(name)
  if (attr == null) return undefined
  return attr ? attr.split(',').map((value) => value.trim()) : []
}

export const itemOf = (part: HTMLElement) => {
  const item = part.closest('ark-tags-input-item')
  return {
    index: Number(item?.getAttribute('index') ?? 0),
    value: item?.getAttribute('value') ?? '',
    disabled: item?.hasAttribute('disabled') || undefined,
  }
}
