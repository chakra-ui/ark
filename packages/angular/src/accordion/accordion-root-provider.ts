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
import type * as accordion from '@zag-js/accordion'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_ACCORDION_CONTEXT } from './use-accordion-context'
import type { UseAccordionReturn } from './use-accordion'

@Directive({
  selector: '[arkAccordionRootProvider]',
  standalone: true,
  exportAs: 'arkAccordionRootProvider',
  providers: [{ provide: ARK_ACCORDION_CONTEXT, useExisting: forwardRef(() => ArkAccordionRootProvider) }],
})
export class ArkAccordionRootProvider implements UseAccordionReturn {
  /** The accordion machine returned by useAccordion(). */
  readonly value: InputSignal<UseAccordionReturn> = input.required<UseAccordionReturn>()
  readonly state: Signal<accordion.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<accordion.Api> = computed(() => this.value().api())
  readonly send: accordion.Service['send'] = (event) => this.value().send(event)

  get service(): accordion.Service {
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
