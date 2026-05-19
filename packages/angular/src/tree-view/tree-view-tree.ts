import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTreeViewContext } from './use-tree-view-context'

@Directive({
  selector: '[arkTreeViewTree]',
  standalone: true,
  exportAs: 'arkTreeViewTree',
})
export class ArkTreeViewTree {
  constructor() {
    const context = injectArkTreeViewContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTreeProps(),
    })
  }
}
