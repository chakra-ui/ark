import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkComboboxContext } from './use-combobox-context'

@Directive({
  selector: '[arkComboboxTrigger]',
  standalone: true,
  exportAs: 'arkComboboxTrigger',
})
export class ArkComboboxTrigger {
  constructor() {
    const context = injectArkComboboxContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTriggerProps(),
    })
  }
}
