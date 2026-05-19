import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkCarouselContext } from './use-carousel-context'

@Directive({
  selector: '[arkCarouselIndicator]',
  standalone: true,
  exportAs: 'arkCarouselIndicator',
})
export class ArkCarouselIndicator {
  /** The zero-based page index this indicator selects. */
  readonly index: InputSignal<number> = input.required<number>()
  /** Whether the indicator should avoid changing the page when clicked. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  constructor() {
    const carousel = injectArkCarouselContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        carousel.api().getIndicatorProps({
          index: this.index(),
          readOnly: this.readOnly(),
        }),
    })
  }
}
