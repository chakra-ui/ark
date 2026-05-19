import type * as scrollArea from '@zag-js/scroll-area'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { ScrollAreaApi, ScrollAreaElementIds } from './scroll-area.types'
import { setupScrollAreaDomEffects } from './scroll-area-setup'
import { ARK_SCROLL_AREA_CONTEXT } from './use-scroll-area-context'
import { useScrollArea, type UseScrollAreaReturn } from './use-scroll-area'

@Directive({
  selector: '[arkScrollArea]',
  standalone: true,
  exportAs: 'arkScrollArea',
  providers: [{ provide: ARK_SCROLL_AREA_CONTEXT, useExisting: forwardRef(() => ArkScrollAreaRoot) }],
})
export class ArkScrollAreaRoot implements UseScrollAreaReturn {
  /** The unique identifier of the scroll area. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the scroll area elements. Useful for composition. */
  readonly ids: InputSignal<Partial<ScrollAreaElementIds> | undefined> = input<
    Partial<ScrollAreaElementIds> | undefined
  >(undefined)

  private readonly machine = useScrollArea({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
    }),
  })

  readonly state: Signal<scrollArea.Service['state']> = this.machine.state
  readonly api: Signal<ScrollAreaApi> = this.machine.api
  readonly service: scrollArea.Service = this.machine.service
  readonly send: scrollArea.Service['send'] = this.machine.send

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
