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
import type * as scrollArea from '@zag-js/scroll-area'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { ScrollAreaApi } from './scroll-area.types'
import { setupScrollAreaDomEffects } from './scroll-area-setup'
import { ARK_SCROLL_AREA_CONTEXT } from './use-scroll-area-context'
import type { UseScrollAreaReturn } from './use-scroll-area'

@Directive({
  selector: '[arkScrollAreaRootProvider]',
  standalone: true,
  exportAs: 'arkScrollAreaRootProvider',
  providers: [{ provide: ARK_SCROLL_AREA_CONTEXT, useExisting: forwardRef(() => ArkScrollAreaRootProvider) }],
})
export class ArkScrollAreaRootProvider implements UseScrollAreaReturn {
  /** The scroll area machine returned by useScrollArea(). */
  readonly value: InputSignal<UseScrollAreaReturn> = input.required<UseScrollAreaReturn>()
  readonly state: Signal<scrollArea.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<ScrollAreaApi> = computed(() => this.value().api())
  readonly send: scrollArea.Service['send'] = (event) => this.value().send(event)

  get service(): scrollArea.Service {
    return this.value().service
  }

  constructor() {
    const destroyRef = inject(DestroyRef)
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef,
      props: () => this.api().getRootProps(),
    })
    setupScrollAreaDomEffects(this, destroyRef)
  }
}
