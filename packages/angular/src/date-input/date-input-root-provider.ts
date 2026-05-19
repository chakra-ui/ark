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
import type * as dateInput from '@zag-js/date-input'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_DATE_INPUT_CONTEXT } from './use-date-input-context'
import type { UseDateInputReturn } from './use-date-input'

@Directive({
  selector: '[arkDateInputRootProvider]',
  standalone: true,
  exportAs: 'arkDateInputRootProvider',
  providers: [{ provide: ARK_DATE_INPUT_CONTEXT, useExisting: forwardRef(() => ArkDateInputRootProvider) }],
})
export class ArkDateInputRootProvider implements UseDateInputReturn {
  /** The date input machine returned by useDateInput(). */
  readonly value: InputSignal<UseDateInputReturn> = input.required<UseDateInputReturn>()
  readonly state: Signal<dateInput.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<dateInput.Api> = computed(() => this.value().api())
  readonly send: dateInput.Service['send'] = (event) => this.value().send(event)

  get service(): dateInput.Service {
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
