import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContext } from './use-field-context'

@Directive({
  selector: '[arkFieldRequiredIndicator]',
  standalone: true,
  exportAs: 'arkFieldRequiredIndicator',
})
export class ArkFieldRequiredIndicator {
  readonly context = injectArkFieldContext()

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.context.getRequiredIndicatorProps(),
    })
  }
}
