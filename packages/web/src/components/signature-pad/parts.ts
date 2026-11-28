import type * as signaturePad from '@zag-js/signature-pad'

import { definePart, ownInput, rootOf, targetOf, wrapped, wrappedButton, type RootElement } from '../../utils/define.js'
import { root } from './shared.js'
import { describedBy } from '../../utils/field.js'

const svgNamespace = 'http://www.w3.org/2000/svg'

const wrappedSvg = wrapped('svg')

const ownSvg = (el: HTMLElement) =>
  wrappedSvg(el) ?? (el.appendChild(el.ownerDocument.createElementNS(svgNamespace, 'svg')) as unknown as HTMLElement)

const drawnPaths = (api: signaturePad.Api) => (api.currentPath ? [...api.paths, api.currentPath] : api.paths)

const renderedPaths = new WeakMap<Element, SVGPathElement[]>()

function setAttributes(node: Element, props: Record<string, unknown>) {
  for (const [name, value] of Object.entries(props)) {
    const text = String(value)
    if (node.getAttribute(name) !== text) node.setAttribute(name, text)
  }
}

const appendPath = (svg: Element) => svg.appendChild(svg.ownerDocument.createElementNS(svgNamespace, 'path'))

function renderPaths(svg: Element, api: signaturePad.Api) {
  const paths = drawnPaths(api)
  const nodes = renderedPaths.get(svg) ?? []

  while (nodes.length > paths.length) nodes.pop()!.remove()
  while (nodes.length < paths.length) nodes.push(appendPath(svg))

  for (const [index, path] of paths.entries()) setAttributes(nodes[index], api.getSegmentPathProps({ path }))
  renderedPaths.set(svg, nodes)
}

interface Capture {
  paths: string[]
  value: string
}

const captures = new WeakMap<HTMLElement, Capture>()

function capture(api: signaturePad.Api, el: HTMLElement) {
  const paths = api.paths
  captures.set(el, { paths, value: captures.get(el)?.value ?? '' })

  queueMicrotask(() => {
    api.getDataUrl('image/png').then(
      (value) => {
        const current = captures.get(el)
        if (current?.paths !== paths || current.value === value) return
        current.value = value
        rootOf<RootElement<signaturePad.Api>>(el, root)?.render()
      },
      () => {},
    )
  })
}

export const SignaturePadLabel = definePart<signaturePad.Api>({
  tag: 'ark-signature-pad-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const SignaturePadControl = definePart<signaturePad.Api>({
  tag: 'ark-signature-pad-control',
  root,
  props: (api, el) => ({ ...describedBy(el), ...api.getControlProps() }),
})

export const SignaturePadSegment = definePart<signaturePad.Api>({
  tag: 'ark-signature-pad-segment',
  root,
  target: ownSvg,
  props: (api) => api.getSegmentProps(),
  render: (api, el) => renderPaths(targetOf(el, ownSvg), api),
})

export const SignaturePadGuide = definePart<signaturePad.Api>({
  tag: 'ark-signature-pad-guide',
  root,
  props: (api) => api.getGuideProps(),
})

export const SignaturePadClearTrigger = definePart<signaturePad.Api>({
  tag: 'ark-signature-pad-clear-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getClearTriggerProps(),
})

export const SignaturePadHiddenInput = definePart<signaturePad.Api>({
  tag: 'ark-signature-pad-hidden-input',
  root,
  target: ownInput,
  props: (api, el) => ({ ...describedBy(el), ...api.getHiddenInputProps({ value: captures.get(el)?.value ?? '' }) }),
  render: (api, el) => {
    if (captures.get(el)?.paths !== api.paths) capture(api, el)
  },
})
