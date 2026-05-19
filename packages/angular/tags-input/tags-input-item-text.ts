import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTagsInputContext } from './use-tags-input-context'
import { injectArkTagsInputItemContext } from './use-tags-input-item-context'

@Directive({
  selector: '[arkTagsInputItemText]',
  standalone: true,
  exportAs: 'arkTagsInputItemText',
})
export class ArkTagsInputItemText {
  constructor() {
    const context = injectArkTagsInputContext()
    const item = injectArkTagsInputItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getItemTextProps({ index: item.index(), value: item.value(), disabled: item.disabled() }),
    })
  }
}
