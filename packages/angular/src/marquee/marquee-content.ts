import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMarqueeContext } from './use-marquee-context'

@Directive({
  selector: '[arkMarqueeContent]',
  standalone: true,
  exportAs: 'arkMarqueeContent',
})
export class ArkMarqueeContent {
  /** The content copy index. Use 0 for the original content. */
  readonly index: InputSignal<number> = input(0)

  constructor() {
    const context = injectArkMarqueeContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getContentProps({ index: this.index() }),
    })
  }
}
