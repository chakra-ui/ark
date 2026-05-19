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
import { injectArkDatePickerContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerRangeText]',
  standalone: true,
  exportAs: 'arkDatePickerRangeText',
})
export class ArkDatePickerRangeText implements AfterContentInit {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly renderer = inject(Renderer2)
  private readonly ownsTextContent = signal(false)

  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: this.elementRef,
      renderer: this.renderer,
      destroyRef: inject(DestroyRef),
      props: () => context.api().getRangeTextProps(),
    })

    effect(() => {
      if (!this.ownsTextContent()) return
      this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', context.api().visibleRangeText.formatted)
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(hasOnlyWhitespaceContent(this.elementRef.nativeElement))
  }
}

function hasOnlyWhitespaceContent(element: HTMLElement): boolean {
  return element.firstElementChild === null && (element.textContent?.trim() ?? '') === ''
}
