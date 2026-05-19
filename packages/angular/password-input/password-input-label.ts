import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPasswordInputContext } from './use-password-input-context'

@Directive({
  selector: '[arkPasswordInputLabel]',
  standalone: true,
  exportAs: 'arkPasswordInputLabel',
})
export class ArkPasswordInputLabel {
  constructor() {
    const context = injectArkPasswordInputContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getLabelProps(),
    })
  }
}
