import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkQrCodeContext } from './use-qr-code-context'
import { applyQrCodeSvgAttributes, omitQrCodeSvgAttributes } from './qr-code-svg-props'

@Directive({
  selector: 'path[arkQrCodePattern]',
  standalone: true,
  exportAs: 'arkQrCodePattern',
})
export class ArkQrCodePattern {
  constructor() {
    const context = injectArkQrCodeContext()
    const elementRef = inject<ElementRef<SVGPathElement>>(ElementRef)
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)
    const props = () => context.api().getPatternProps() as Record<string, unknown>

    applyArkProps({
      elementRef: elementRef as unknown as ElementRef<HTMLElement>,
      renderer,
      destroyRef,
      props: () => omitQrCodeSvgAttributes(props()),
    })
    applyQrCodeSvgAttributes(elementRef as unknown as ElementRef<SVGElement>, renderer, destroyRef, props)
  }
}
