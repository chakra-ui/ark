import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSelectContext } from './use-select-context'

@Directive({
  selector: '[arkSelectPositioner]',
  standalone: true,
  exportAs: 'arkSelectPositioner',
})
export class ArkSelectPositioner {
  constructor() {
    const context = injectArkSelectContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getPositionerProps(),
    })
  }
}
