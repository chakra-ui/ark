import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkEditableContext } from './use-editable-context'

@Directive({
  selector: '[arkEditableArea]',
  standalone: true,
  exportAs: 'arkEditableArea',
})
export class ArkEditableArea {
  constructor() {
    const context = injectArkEditableContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getAreaProps(),
    })
  }
}
