import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSwitchContext } from './use-switch-context'

@Directive({
  selector: '[arkSwitchThumb]',
  standalone: true,
  exportAs: 'arkSwitchThumb',
})
export class ArkSwitchThumb {
  constructor() {
    const context = injectArkSwitchContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getThumbProps(),
    })
  }
}
