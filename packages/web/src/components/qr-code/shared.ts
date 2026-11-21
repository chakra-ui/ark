export const root = 'ark-qr-code'
export const frame = 'ark-qr-code-frame'

const SVG_NS = 'http://www.w3.org/2000/svg'

const svgChild = <T extends SVGElement>(parent: Element, name: string) =>
  parent.querySelector<T>(`:scope > ${name}`) ?? parent.appendChild(document.createElementNS(SVG_NS, name) as T)

export const ownSvg = (el: Element) => svgChild<SVGSVGElement>(el, 'svg')

export function ownPath(el: Element) {
  const owner = el.parentElement
  if (owner?.localName !== frame) return null
  return svgChild<SVGPathElement>(ownSvg(owner), 'path')
}
