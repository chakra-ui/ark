import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTagsInputContext } from './use-tags-input-context'

@Directive({
  selector: '[arkTagsInputControl]',
  standalone: true,
  exportAs: 'arkTagsInputControl',
})
export class ArkTagsInputControl {
  constructor() {
    const context = injectArkTagsInputContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getControlProps(),
    })
  }
}
