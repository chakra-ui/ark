import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { FloatingPanelResizeTriggerAxis } from './floating-panel.types'
import { injectArkFloatingPanelContext } from './use-floating-panel-context'

@Directive({
  selector: '[arkFloatingPanelResizeTrigger]',
  standalone: true,
  exportAs: 'arkFloatingPanelResizeTrigger',
})
export class ArkFloatingPanelResizeTrigger {
  /** The axis of the resize handle. */
  readonly axis: InputSignal<FloatingPanelResizeTriggerAxis> = input.required<FloatingPanelResizeTriggerAxis>()

  constructor() {
    const context = injectArkFloatingPanelContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getResizeTriggerProps({ axis: this.axis() }),
    })
  }
}
