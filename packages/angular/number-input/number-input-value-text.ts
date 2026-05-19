import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkNumberInputContext } from './use-number-input-context'

@Directive({
  selector: '[arkNumberInputValueText]',
  standalone: true,
  exportAs: 'arkNumberInputValueText',
})
export class ArkNumberInputValueText {
  constructor() {
    const context = injectArkNumberInputContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getValueTextProps(),
    })
  }
}
