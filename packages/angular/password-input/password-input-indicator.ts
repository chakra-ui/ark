import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPasswordInputContext } from './use-password-input-context'

@Directive({
  selector: '[arkPasswordInputIndicator]',
  standalone: true,
  exportAs: 'arkPasswordInputIndicator',
})
export class ArkPasswordInputIndicator {
  constructor() {
    const context = injectArkPasswordInputContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getIndicatorProps(),
    })
  }
}
