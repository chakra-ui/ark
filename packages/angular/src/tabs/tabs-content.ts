import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTabsContext } from './use-tabs-context'

@Directive({
  selector: '[arkTabsContent]',
  standalone: true,
  exportAs: 'arkTabsContent',
})
export class ArkTabsContent {
  /** The value of the tab content. */
  readonly value: InputSignal<string> = input.required<string>()

  constructor() {
    const context = injectArkTabsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getContentProps({
          value: this.value(),
        }),
    })
  }
}
