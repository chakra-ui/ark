import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSignaturePadContext } from './use-signature-pad-context'

@Directive({
  selector: '[arkSignaturePadGuide]',
  standalone: true,
  exportAs: 'arkSignaturePadGuide',
})
export class ArkSignaturePadGuide {
  constructor() {
    const context = injectArkSignaturePadContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getGuideProps(),
    })
  }
}
