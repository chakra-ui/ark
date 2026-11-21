import type * as splitter from '@zag-js/splitter'

import { num, str } from '../../utils/attrs.js'
import { rootOf } from '../../utils/define.js'

export const root = 'ark-splitter'
export const panelTag = 'ark-splitter-panel'

export const panelAttributes = [
  'value',
  'order',
  'min-size',
  'max-size',
  'collapsible',
  'collapsed-size',
  'collapsed-threshold',
  'resize-behavior',
  'disabled',
]

export const size = (value: string | null | undefined): splitter.PanelSize | undefined =>
  value == null || value.trim() === '' ? undefined : Number.isNaN(Number(value)) ? value.trim() : Number(value)

export const sizes = (el: Element, name: string) =>
  el
    .getAttribute(name)
    ?.split(',')
    .map((value) => size(value) ?? 0)

export const panelValue = (el: Element) => el.getAttribute('value') ?? ''

export const readPanels = (el: HTMLElement): splitter.PanelData[] =>
  Array.from(el.querySelectorAll<HTMLElement>(panelTag))
    .filter((panel) => rootOf(panel, root) === el)
    .map((panel) => ({
      id: panelValue(panel),
      order: num(panel, 'order'),
      minSize: size(panel.getAttribute('min-size')),
      maxSize: size(panel.getAttribute('max-size')),
      collapsible: panel.hasAttribute('collapsible') || undefined,
      collapsedSize: size(panel.getAttribute('collapsed-size')),
      collapsedThreshold: size(panel.getAttribute('collapsed-threshold')),
      resizeBehavior: str<splitter.PanelResizeBehavior>(panel, 'resize-behavior'),
      disabled: panel.hasAttribute('disabled') || undefined,
    }))
