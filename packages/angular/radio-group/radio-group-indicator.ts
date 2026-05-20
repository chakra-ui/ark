import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkRadioGroupContext } from './use-radio-group-context'

@Directive({
  selector: '[arkRadioGroupIndicator]',
  standalone: true,
  exportAs: 'arkRadioGroupIndicator',
})
export class ArkRadioGroupIndicator {
  constructor() {
    const context = injectArkRadioGroupContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getIndicatorProps(),
    })
  }
}
