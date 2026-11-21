import type * as numberFlow from '@zag-js/number-flow'
import { spreadProps } from '@zag-js/vanilla'

export const root = 'ark-number-flow'

const span = () => document.createElement('span')

function renderDigit(api: numberFlow.Api, node: HTMLElement, segment: numberFlow.DigitSegment, id: string) {
  spreadProps(node, api.getDigitProps({ segment }), id)
  const track = (node.firstElementChild as HTMLElement | null) ?? node.appendChild(span())
  spreadProps(track, api.getDigitTrackProps({ segment }), id)
  while (track.children.length > api.digitCells.length) track.lastElementChild!.remove()
  api.digitCells.forEach((cell, index) => {
    const cellNode = (track.children[index] as HTMLElement | undefined) ?? track.appendChild(span())
    spreadProps(cellNode, api.getDigitCellProps({ segment, cell }), id)
    if (cellNode.textContent !== cell.glyph) cellNode.textContent = cell.glyph
  })
}

const nodes = new WeakMap<HTMLElement, Map<string, HTMLElement>>()

export function renderSegments(api: numberFlow.Api, el: HTMLElement, id: string) {
  const prev = nodes.get(el) ?? new Map<string, HTMLElement>()
  const next = new Map<string, HTMLElement>()
  let anchor: Element | null = null
  for (const segment of api.segments) {
    const key = `${segment.kind}:${segment.key}`
    const node = prev.get(key) ?? span()
    if (segment.kind === 'digit') renderDigit(api, node, segment, id)
    else {
      spreadProps(node, api.getSymbolProps({ segment }), id)
      if (node.textContent !== segment.value) node.textContent = segment.value
    }
    const expected: Element | null = anchor ? anchor.nextElementSibling : el.firstElementChild
    if (expected !== node) anchor ? anchor.after(node) : el.prepend(node)
    anchor = node
    next.set(key, node)
  }
  for (const [key, node] of prev) if (!next.has(key)) node.remove()
  nodes.set(el, next)
}
