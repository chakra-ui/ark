import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContext } from './use-field-context'

@Directive({
  selector: '[arkFieldSelect]',
  standalone: true,
  exportAs: 'arkFieldSelect',
})
export class ArkFieldSelect {
  constructor() {
    const context = injectArkFieldContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.getSelectProps(),
    })
  }
}
