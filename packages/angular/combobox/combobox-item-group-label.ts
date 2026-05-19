import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkComboboxContext } from './use-combobox-context'
import { injectArkComboboxItemGroupContext } from './combobox-item-group'

@Directive({
  selector: '[arkComboboxItemGroupLabel]',
  standalone: true,
  exportAs: 'arkComboboxItemGroupLabel',
})
export class ArkComboboxItemGroupLabel {
  constructor() {
    const context = injectArkComboboxContext()
    const group = injectArkComboboxItemGroupContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemGroupLabelProps({ htmlFor: group.id() }),
    })
  }
}
