import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkListboxContext } from './use-listbox-context'

@Directive({
  selector: '[arkListboxContent]',
  standalone: true,
  exportAs: 'arkListboxContent',
})
export class ArkListboxContent {
  constructor() {
    const context = injectArkListboxContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getContentProps(),
    })
  }
}
