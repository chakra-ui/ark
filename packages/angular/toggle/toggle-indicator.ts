import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkToggleContext } from './use-toggle-context'

@Directive({
  selector: '[arkToggleIndicator]',
  standalone: true,
  exportAs: 'arkToggleIndicator',
})
export class ArkToggleIndicator {
  constructor() {
    const context = injectArkToggleContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getIndicatorProps(),
    })
  }
}
