import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkListboxContext } from './use-listbox-context'
import { injectArkListboxItemGroupContext } from './listbox-item-group'

@Directive({
  selector: '[arkListboxItemGroupLabel]',
  standalone: true,
  exportAs: 'arkListboxItemGroupLabel',
})
export class ArkListboxItemGroupLabel {
  constructor() {
    const context = injectArkListboxContext()
    const group = injectArkListboxItemGroupContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemGroupLabelProps({ htmlFor: group.id() }),
    })
  }
}
