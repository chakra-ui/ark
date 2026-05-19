import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { MarqueeSide } from './marquee.types'
import { injectArkMarqueeContext } from './use-marquee-context'

@Directive({
  selector: '[arkMarqueeEdge]',
  standalone: true,
  exportAs: 'arkMarqueeEdge',
})
export class ArkMarqueeEdge {
  /** The side where the edge gradient should appear. */
  readonly side: InputSignal<MarqueeSide> = input.required<MarqueeSide>()

  constructor() {
    const context = injectArkMarqueeContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getEdgeProps({ side: this.side() }),
    })
  }
}
