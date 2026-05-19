import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { SplitterPanelId } from './splitter.types'
import { injectArkSplitterContext } from './use-splitter-context'

@Directive({
  selector: '[arkSplitterPanel]',
  standalone: true,
  exportAs: 'arkSplitterPanel',
})
export class ArkSplitterPanel {
  /** The id of the panel. */
  readonly id: InputSignal<SplitterPanelId> = input.required<SplitterPanelId>()

  constructor() {
    const context = injectArkSplitterContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getPanelProps({ id: this.id() }),
    })
  }
}
