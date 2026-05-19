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
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { ScrollAreaScrollbarProps } from './scroll-area.types'
import { injectArkScrollAreaContext } from './use-scroll-area-context'
import {
  ARK_SCROLL_AREA_SCROLLBAR_CONTEXT,
  type UseScrollAreaScrollbarContext,
} from './use-scroll-area-scrollbar-context'

@Directive({
  selector: '[arkScrollAreaScrollbar]',
  standalone: true,
  exportAs: 'arkScrollAreaScrollbar',
  providers: [
    {
      provide: ARK_SCROLL_AREA_SCROLLBAR_CONTEXT,
      useFactory: (scrollbar: ArkScrollAreaScrollbar) => scrollbar.getScrollbarContext(),
      deps: [forwardRef(() => ArkScrollAreaScrollbar)],
    },
  ],
})
export class ArkScrollAreaScrollbar {
  /** The orientation of the scrollbar. */
  readonly orientation: InputSignal<ScrollAreaScrollbarProps['orientation'] | undefined> = input<
    ScrollAreaScrollbarProps['orientation'] | undefined
  >(undefined)

  private readonly scrollbarContext: UseScrollAreaScrollbarContext = {
    orientation: computed(() => this.orientation()),
  }

  constructor() {
    const context = injectArkScrollAreaContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getScrollbarProps({ orientation: this.orientation() }),
    })
  }

  /** @internal Exposed for scrollbar-scoped descendant directives. */
  getScrollbarContext(): UseScrollAreaScrollbarContext {
    return this.scrollbarContext
  }
}
