import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTreeViewContext } from './use-tree-view-context'

@Directive({
  selector: '[arkTreeViewLabel]',
  standalone: true,
  exportAs: 'arkTreeViewLabel',
})
export class ArkTreeViewLabel {
  constructor() {
    const context = injectArkTreeViewContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getLabelProps(),
    })
  }
}
