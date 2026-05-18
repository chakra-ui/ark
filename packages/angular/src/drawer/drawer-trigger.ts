import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDrawerContext } from './use-drawer-context'

@Directive({
  selector: '[arkDrawerTrigger]',
  standalone: true,
  exportAs: 'arkDrawerTrigger',
})
export class ArkDrawerTrigger {
  constructor() {
    const context = injectArkDrawerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTriggerProps(),
    })
  }
}
