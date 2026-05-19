import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import type * as timer from '@zag-js/timer'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_TIMER_CONTEXT } from './use-timer-context'
import type { UseTimerReturn } from './use-timer'

@Directive({
  selector: '[arkTimerRootProvider]',
  standalone: true,
  exportAs: 'arkTimerRootProvider',
  providers: [{ provide: ARK_TIMER_CONTEXT, useExisting: forwardRef(() => ArkTimerRootProvider) }],
})
export class ArkTimerRootProvider implements UseTimerReturn {
  /** The timer machine returned by useTimer(). */
  readonly value: InputSignal<UseTimerReturn> = input.required<UseTimerReturn>()
  readonly state: Signal<timer.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<timer.Api> = computed(() => this.value().api())
  readonly send: timer.Service['send'] = (event) => this.value().send(event)

  get service(): timer.Service {
    return this.value().service
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
