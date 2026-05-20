import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkRadioGroupContext } from './use-radio-group-context'

@Directive({
  selector: '[arkRadioGroupLabel]',
  standalone: true,
  exportAs: 'arkRadioGroupLabel',
})
export class ArkRadioGroupLabel {
  constructor() {
    const context = injectArkRadioGroupContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getLabelProps(),
    })
  }
}
