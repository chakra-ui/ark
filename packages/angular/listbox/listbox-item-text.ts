import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkListboxContext } from './use-listbox-context'
import { injectArkListboxItemContext } from './use-listbox-item-context'

@Directive({
  selector: '[arkListboxItemText]',
  standalone: true,
  exportAs: 'arkListboxItemText',
})
export class ArkListboxItemText {
  constructor() {
    const context = injectArkListboxContext()
    const item = injectArkListboxItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemTextProps({ item: item.item(), highlightOnHover: item.highlightOnHover() }),
    })
  }
}
