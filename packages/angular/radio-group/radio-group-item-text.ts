import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkRadioGroupContext } from './use-radio-group-context'
import { injectArkRadioGroupItemContext } from './use-radio-group-item-context'

@Directive({
  selector: '[arkRadioGroupItemText]',
  standalone: true,
  exportAs: 'arkRadioGroupItemText',
})
export class ArkRadioGroupItemText {
  constructor() {
    const context = injectArkRadioGroupContext()
    const item = injectArkRadioGroupItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemTextProps(item.itemProps()),
    })
  }
}
