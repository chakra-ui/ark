import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { TimerAction } from './timer.types'
import { injectArkTimerContext } from './use-timer-context'

@Directive({
  selector: '[arkTimerActionTrigger]',
  standalone: true,
  exportAs: 'arkTimerActionTrigger',
})
export class ArkTimerActionTrigger {
  /** The action to perform when the trigger is clicked. */
  readonly action: InputSignal<TimerAction> = input.required<TimerAction>()

  constructor() {
    const timer = injectArkTimerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => timer.api().getActionTriggerProps({ action: this.action() }),
    })
  }
}
