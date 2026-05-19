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
import type { DateInputDateSegment } from './date-input.types'
import { injectArkDateInputSegmentGroupContext } from './date-input-segment-group'
import { injectArkDateInputContext } from './use-date-input-context'

@Directive({
  selector: '[arkDateInputSegment]',
  standalone: true,
  exportAs: 'arkDateInputSegment',
})
export class ArkDateInputSegment implements AfterContentInit {
  /** The date segment to render. */
  readonly segment: InputSignal<DateInputDateSegment> = input.required<DateInputDateSegment>()

  private readonly ownsTextContent = signal(false)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)

  constructor() {
    const context = injectArkDateInputContext()
    const segmentGroup = injectArkDateInputSegmentGroupContext()
    const renderer = inject(Renderer2)

    applyArkProps({
      elementRef: this.elementRef,
      renderer,
      destroyRef: inject(DestroyRef),
      props: () => context.api().getSegmentProps({ segment: this.segment(), index: segmentGroup.index() }),
    })

    effect(() => {
      if (!this.ownsTextContent()) return
      renderer.setProperty(this.elementRef.nativeElement, 'textContent', this.segment().text)
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(this.elementRef.nativeElement.childNodes.length === 0)
  }
}
