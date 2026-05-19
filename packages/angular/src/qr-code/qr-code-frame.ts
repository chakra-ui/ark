import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkQrCodeContext } from './use-qr-code-context'
import { applyQrCodeSvgAttributes, omitQrCodeSvgAttributes } from './qr-code-svg-props'

@Directive({
  selector: 'svg[arkQrCodeFrame]',
  standalone: true,
  exportAs: 'arkQrCodeFrame',
})
export class ArkQrCodeFrame {
  constructor() {
    const context = injectArkQrCodeContext()
    const elementRef = inject<ElementRef<SVGSVGElement>>(ElementRef)
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)
    const props = () => context.api().getFrameProps() as Record<string, unknown>

    applyArkProps({
      elementRef: elementRef as unknown as ElementRef<HTMLElement>,
      renderer,
      destroyRef,
      props: () => omitQrCodeSvgAttributes(props()),
    })
    applyQrCodeSvgAttributes(elementRef as unknown as ElementRef<SVGElement>, renderer, destroyRef, props)
  }
}
