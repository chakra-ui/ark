import { type DestroyRef, type ElementRef, type Renderer2, effect } from '@angular/core'

const SVG_ATTRIBUTE_KEYS = new Set(['d', 'viewBox', 'xmlns'])

export function omitQrCodeSvgAttributes(props: Record<string, unknown>): Record<string, unknown> {
  const next = { ...props }
  for (const key of SVG_ATTRIBUTE_KEYS) {
    delete next[key]
  }
  return next
}

export function applyQrCodeSvgAttributes(
  elementRef: ElementRef<SVGElement>,
  renderer: Renderer2,
  destroyRef: DestroyRef,
  props: () => Record<string, unknown> | undefined,
): void {
  const applied = new Set<string>()

  effect(() => {
    const next = props() ?? {}
    for (const key of SVG_ATTRIBUTE_KEYS) {
      const value = next[key]
      if (value == null || value === false) {
        if (applied.has(key)) {
          renderer.removeAttribute(elementRef.nativeElement, key)
          applied.delete(key)
        }
        continue
      }
      renderer.setAttribute(elementRef.nativeElement, key, String(value))
      applied.add(key)
    }
  })

  destroyRef.onDestroy(() => {
    for (const key of applied) {
      renderer.removeAttribute(elementRef.nativeElement, key)
    }
    applied.clear()
  })
}
