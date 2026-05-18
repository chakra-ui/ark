import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPopoverContext } from './use-popover-context'

@Directive({
  selector: '[arkPopoverCloseTrigger]',
  standalone: true,
  exportAs: 'arkPopoverCloseTrigger',
})
export class ArkPopoverCloseTrigger {
  constructor() {
    const context = injectArkPopoverContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getCloseTriggerProps(),
    })
  }
}
