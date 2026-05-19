import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSelectContext } from './use-select-context'
import { injectArkSelectItemContext } from './use-select-item-context'

@Directive({
  selector: '[arkSelectItemText]',
  standalone: true,
  exportAs: 'arkSelectItemText',
})
export class ArkSelectItemText {
  constructor() {
    const context = injectArkSelectContext()
    const item = injectArkSelectItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemTextProps({ item: item.item(), persistFocus: item.persistFocus() }),
    })
  }
}
