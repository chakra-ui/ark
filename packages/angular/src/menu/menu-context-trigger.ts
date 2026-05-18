import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMenuContext } from './use-menu-context'

@Directive({
  selector: '[arkMenuContextTrigger]',
  standalone: true,
  exportAs: 'arkMenuContextTrigger',
})
export class ArkMenuContextTrigger {
  constructor() {
    const context = injectArkMenuContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getContextTriggerProps(),
    })
  }
}
