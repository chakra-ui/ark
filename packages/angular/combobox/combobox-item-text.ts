import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkComboboxContext } from './use-combobox-context'
import { injectArkComboboxItemContext } from './use-combobox-item-context'

@Directive({
  selector: '[arkComboboxItemText]',
  standalone: true,
  exportAs: 'arkComboboxItemText',
})
export class ArkComboboxItemText {
  constructor() {
    const context = injectArkComboboxContext()
    const item = injectArkComboboxItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemTextProps({ item: item.item(), persistFocus: item.persistFocus() }),
    })
  }
}
