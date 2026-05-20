import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkRadioGroupContext } from './use-radio-group-context'
import { injectArkRadioGroupItemContext } from './use-radio-group-item-context'

@Directive({
  selector: '[arkRadioGroupItemHiddenInput]',
  standalone: true,
  exportAs: 'arkRadioGroupItemHiddenInput',
})
export class ArkRadioGroupItemHiddenInput {
  constructor() {
    const context = injectArkRadioGroupContext()
    const item = injectArkRadioGroupItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemHiddenInputProps(item.itemProps()),
    })
  }
}
