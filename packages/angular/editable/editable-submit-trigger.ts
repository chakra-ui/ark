import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkEditableContext } from './use-editable-context'

@Directive({
  selector: '[arkEditableSubmitTrigger]',
  standalone: true,
  exportAs: 'arkEditableSubmitTrigger',
})
export class ArkEditableSubmitTrigger {
  constructor() {
    const context = injectArkEditableContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getSubmitTriggerProps(),
    })
  }
}
