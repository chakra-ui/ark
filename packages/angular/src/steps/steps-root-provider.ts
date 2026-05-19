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
import type * as steps from '@zag-js/steps'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_STEPS_CONTEXT } from './use-steps-context'
import type { UseStepsReturn } from './use-steps'

@Directive({
  selector: '[arkStepsRootProvider]',
  standalone: true,
  exportAs: 'arkStepsRootProvider',
  providers: [{ provide: ARK_STEPS_CONTEXT, useExisting: forwardRef(() => ArkStepsRootProvider) }],
})
export class ArkStepsRootProvider implements UseStepsReturn {
  /** The steps machine returned by useSteps(). */
  readonly value: InputSignal<UseStepsReturn> = input.required<UseStepsReturn>()
  readonly state: Signal<steps.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<steps.Api> = computed(() => this.value().api())
  readonly send: steps.Service['send'] = (event) => this.value().send(event)

  get service(): steps.Service {
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
