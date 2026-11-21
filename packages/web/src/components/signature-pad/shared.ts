import type { DrawingOptions } from '@zag-js/signature-pad'

import { num, str } from '../../utils/attrs.js'

export const root = 'ark-signature-pad'

export const drawingAttributes = [
  'drawing-fill',
  'drawing-size',
  'drawing-thinning',
  'drawing-smoothing',
  'drawing-streamline',
  'drawing-simulate-pressure',
]

const defined = (options: DrawingOptions) =>
  Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined)) as DrawingOptions

export function drawingOf(el: Element, options?: DrawingOptions): DrawingOptions {
  return {
    ...defined({
      fill: str(el, 'drawing-fill'),
      size: num(el, 'drawing-size'),
      thinning: num(el, 'drawing-thinning'),
      smoothing: num(el, 'drawing-smoothing'),
      streamline: num(el, 'drawing-streamline'),
      simulatePressure: el.hasAttribute('drawing-simulate-pressure') || undefined,
    }),
    ...options,
  }
}

export const json = <T>(el: Element, name: string): T | undefined => {
  const value = el.getAttribute(name)
  return value ? JSON.parse(value) : undefined
}
