import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  type InputSignal,
  type Signal,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import type * as progress from '@zag-js/progress'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_PROGRESS_CONTEXT } from './use-progress-context'
import type { UseProgressReturn } from './use-progress'

@Directive({
  selector: '[arkProgressRootProvider]',
  standalone: true,
  exportAs: 'arkProgressRootProvider',
  providers: [{ provide: ARK_PROGRESS_CONTEXT, useExisting: forwardRef(() => ArkProgressRootProvider) }],
})
export class ArkProgressRootProvider implements UseProgressReturn {
  /** The progress machine returned by useProgress(). */
  readonly value: InputSignal<UseProgressReturn> = input.required<UseProgressReturn>()
  readonly state: Signal<progress.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<progress.Api> = computed(() => this.value().api())
  readonly send: progress.Service['send'] = (event) => this.value().send(event)

  get service(): progress.Service {
    return this.value().service
  }

  resolveValue(): UseProgressReturn {
    return this.value()
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
