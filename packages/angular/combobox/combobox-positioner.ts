import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkComboboxContext } from './use-combobox-context'

@Directive({
  selector: '[arkComboboxPositioner]',
  standalone: true,
  exportAs: 'arkComboboxPositioner',
})
export class ArkComboboxPositioner {
  constructor() {
    const context = injectArkComboboxContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getPositionerProps(),
    })
  }
}
