import { type DestroyRef, type ElementRef, type Renderer2, RendererStyleFlags2, effect } from '@angular/core'

const QR_CODE_CUSTOM_PROPERTIES = ['--qrcode-pixel-size', '--qrcode-width', '--qrcode-height']

export function applyQrCodeRootStyles(
  elementRef: ElementRef<HTMLElement>,
  renderer: Renderer2,
  destroyRef: DestroyRef,
  props: () => Record<string, unknown> | undefined,
): void {
  effect(() => {
    const style = (props()?.['style'] ?? {}) as Record<string, unknown>
    for (const name of QR_CODE_CUSTOM_PROPERTIES) {
      const value = style[name]
      if (value == null || value === false) {
        renderer.removeStyle(elementRef.nativeElement, name, RendererStyleFlags2.DashCase)
      } else {
        renderer.setStyle(elementRef.nativeElement, name, String(value), RendererStyleFlags2.DashCase)
      }
    }
  })

  destroyRef.onDestroy(() => {
    for (const name of QR_CODE_CUSTOM_PROPERTIES) {
      renderer.removeStyle(elementRef.nativeElement, name, RendererStyleFlags2.DashCase)
    }
  })
}
