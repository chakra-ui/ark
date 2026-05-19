import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTabsContext } from './use-tabs-context'

@Directive({
  selector: '[arkTabsList]',
  standalone: true,
  exportAs: 'arkTabsList',
})
export class ArkTabsList {
  constructor() {
    const context = injectArkTabsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getListProps(),
    })
  }
}
