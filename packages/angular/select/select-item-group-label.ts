import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSelectContext } from './use-select-context'
import { injectArkSelectItemGroupContext } from './select-item-group'

@Directive({
  selector: '[arkSelectItemGroupLabel]',
  standalone: true,
  exportAs: 'arkSelectItemGroupLabel',
})
export class ArkSelectItemGroupLabel {
  constructor() {
    const context = injectArkSelectContext()
    const group = injectArkSelectItemGroupContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemGroupLabelProps({ htmlFor: group.id() }),
    })
  }
}
