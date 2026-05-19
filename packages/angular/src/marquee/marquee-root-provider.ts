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
import type * as marquee from '@zag-js/marquee'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_MARQUEE_CONTEXT } from './use-marquee-context'
import type { UseMarqueeReturn } from './use-marquee'

@Directive({
  selector: '[arkMarqueeRootProvider]',
  standalone: true,
  exportAs: 'arkMarqueeRootProvider',
  providers: [{ provide: ARK_MARQUEE_CONTEXT, useExisting: forwardRef(() => ArkMarqueeRootProvider) }],
})
export class ArkMarqueeRootProvider implements UseMarqueeReturn {
  /** The marquee machine returned by useMarquee(). */
  readonly value: InputSignal<UseMarqueeReturn> = input.required<UseMarqueeReturn>()
  readonly state: Signal<marquee.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<marquee.Api> = computed(() => this.value().api())
  readonly send: marquee.Service['send'] = (event) => this.value().send(event)

  get service(): marquee.Service {
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
