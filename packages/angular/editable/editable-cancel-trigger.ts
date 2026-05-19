import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkEditableContext } from './use-editable-context'

@Directive({
  selector: '[arkEditableCancelTrigger]',
  standalone: true,
  exportAs: 'arkEditableCancelTrigger',
})
export class ArkEditableCancelTrigger {
  constructor() {
    const context = injectArkEditableContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getCancelTriggerProps(),
    })
  }
}
