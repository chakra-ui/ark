import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkComboboxContext } from './use-combobox-context'
import { injectArkComboboxItemContext } from './use-combobox-item-context'

@Directive({
  selector: '[arkComboboxItemIndicator]',
  standalone: true,
  exportAs: 'arkComboboxItemIndicator',
})
export class ArkComboboxItemIndicator {
  constructor() {
    const context = injectArkComboboxContext()
    const item = injectArkComboboxItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemIndicatorProps({ item: item.item(), persistFocus: item.persistFocus() }),
    })
  }
}
