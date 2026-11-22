import type { FlipState } from '@zag-js/image-cropper'

import { list } from '../../utils/attrs.js'

export const root = 'ark-image-cropper'

export function flipOf(el: Element, name: string): FlipState | undefined {
  if (!el.hasAttribute(name)) return undefined

  const axes = list(el, name) ?? []

  return {
    horizontal: axes.includes('horizontal'),
    vertical: axes.includes('vertical'),
  }
}

export function ratioOf(el: Element) {
  const value = el.getAttribute('aspect-ratio')
  if (!value) return undefined

  const [width, height = 1] = value.split('/').map(Number)
  const ratio = width / height

  return Number.isFinite(ratio) && ratio > 0 ? ratio : undefined
}
