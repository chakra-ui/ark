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
import { injectArkTourContext } from './use-tour-context'

@Directive({
  selector: '[arkTourTitle]',
  standalone: true,
  exportAs: 'arkTourTitle',
})
export class ArkTourTitle implements AfterContentInit {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly renderer = inject(Renderer2)
  private readonly ownsTextContent = signal(false)

  constructor() {
    const tour = injectArkTourContext()
    applyArkProps({
      elementRef: this.elementRef,
      renderer: this.renderer,
      destroyRef: inject(DestroyRef),
      props: () => tour.api().getTitleProps(),
    })

    effect(() => {
      if (!this.ownsTextContent()) return
      this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', tour.api().step?.title ?? '')
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(hasOnlyWhitespaceContent(this.elementRef.nativeElement))
  }
}

function hasOnlyWhitespaceContent(element: HTMLElement): boolean {
  return element.firstElementChild === null && (element.textContent?.trim() ?? '') === ''
}
