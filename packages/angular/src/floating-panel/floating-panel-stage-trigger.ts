import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { FloatingPanelStage } from './floating-panel.types'
import { injectArkFloatingPanelContext } from './use-floating-panel-context'

@Directive({
  selector: '[arkFloatingPanelStageTrigger]',
  standalone: true,
  exportAs: 'arkFloatingPanelStageTrigger',
})
export class ArkFloatingPanelStageTrigger {
  /** The stage to apply when the trigger is clicked. */
  readonly stage: InputSignal<FloatingPanelStage> = input.required<FloatingPanelStage>()

  constructor() {
    const context = injectArkFloatingPanelContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getStageTriggerProps({ stage: this.stage() }),
    })
  }
}
