import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
  signal,
  type AfterContentInit,
  type InputSignal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { carouselAnatomy } from './carousel.anatomy'
import { injectArkCarouselContext } from './use-carousel-context'

@Directive({
  selector: '[arkCarouselAutoplayIndicator]',
  standalone: true,
  exportAs: 'arkCarouselAutoplayIndicator',
})
export class ArkCarouselAutoplayIndicator implements AfterContentInit {
  /** Text to render when autoplay is active and the element has no content. */
  readonly label: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Text to render when autoplay is paused and the element has no content. */
  readonly fallback: InputSignal<string | undefined> = input<string | undefined>(undefined)

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly renderer = inject(Renderer2)
  private readonly ownsTextContent = signal(false)

  constructor() {
    const carousel = injectArkCarouselContext()
    applyArkProps({
      elementRef: this.elementRef,
      renderer: this.renderer,
      destroyRef: inject(DestroyRef),
      props: () => carouselAnatomy.build().autoplayIndicator.attrs,
    })

    effect(() => {
      if (!this.ownsTextContent()) return
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'textContent',
        carousel.api().isPlaying ? (this.label() ?? '') : (this.fallback() ?? ''),
      )
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(hasOnlyWhitespaceContent(this.elementRef.nativeElement))
  }
}

function hasOnlyWhitespaceContent(element: HTMLElement): boolean {
  return element.firstElementChild === null && (element.textContent?.trim() ?? '') === ''
}
