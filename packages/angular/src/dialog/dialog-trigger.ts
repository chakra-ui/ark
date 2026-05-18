import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDialogContext } from './use-dialog-context'

@Directive({
  selector: '[arkDialogTrigger]',
  standalone: true,
  exportAs: 'arkDialogTrigger',
})
export class ArkDialogTrigger {
  constructor() {
    const context = injectArkDialogContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTriggerProps(),
    })
  }
}
