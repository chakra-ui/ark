import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  signal,
  type AfterContentInit,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkCarouselContext } from './use-carousel-context'

@Directive({
  selector: '[arkCarouselProgressText]',
  standalone: true,
  exportAs: 'arkCarouselProgressText',
})
export class ArkCarouselProgressText implements AfterContentInit {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly renderer = inject(Renderer2)
  private readonly ownsTextContent = signal(false)

  constructor() {
    const carousel = injectArkCarouselContext()
    applyArkProps({
      elementRef: this.elementRef,
      renderer: this.renderer,
      destroyRef: inject(DestroyRef),
      props: () => carousel.api().getProgressTextProps(),
    })

    effect(() => {
      if (!this.ownsTextContent()) return
      this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', carousel.api().getProgressText())
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(hasOnlyWhitespaceContent(this.elementRef.nativeElement))
  }
}

function hasOnlyWhitespaceContent(element: HTMLElement): boolean {
  return element.firstElementChild === null && (element.textContent?.trim() ?? '') === ''
}
