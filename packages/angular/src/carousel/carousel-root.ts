import type * as carousel from '@zag-js/carousel'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type {
  CarouselAutoplayStatusDetails,
  CarouselDragStatusDetails,
  CarouselElementIds,
  CarouselIntlTranslations,
  CarouselPageChangeDetails,
} from './carousel.types'
import { ARK_CAROUSEL_CONTEXT } from './use-carousel-context'
import { useCarousel, type UseCarouselReturn } from './use-carousel'

const autoplayAttribute = (value: unknown): boolean | { delay: number } | undefined => {
  if (value === undefined || value === null) return undefined
  if (typeof value === 'object' && !Array.isArray(value) && 'delay' in value) return value as { delay: number }
  return booleanAttribute(value)
}

@Directive({
  selector: '[arkCarousel]',
  standalone: true,
  exportAs: 'arkCarousel',
  providers: [{ provide: ARK_CAROUSEL_CONTEXT, useExisting: forwardRef(() => ArkCarouselRoot) }],
})
export class ArkCarouselRoot implements UseCarouselReturn {
  /** The unique identifier of the carousel. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the carousel elements. Useful for composition. */
  readonly ids: InputSignal<CarouselElementIds | undefined> = input<CarouselElementIds | undefined>(undefined)
  /** The controlled page of the carousel. */
  readonly page: ModelSignal<number | undefined> = model<number | undefined>(undefined)
  /** The initial page when uncontrolled. */
  readonly defaultPage: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The total number of slides. */
  readonly slideCount: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The number of slides to show at a time. */
  readonly slidesPerPage: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The number of slides to scroll at a time. */
  readonly slidesPerMove: InputSignal<number | 'auto' | undefined> = input<number | 'auto' | undefined>(undefined)
  /** Whether to enable variable-size slides. */
  readonly autoSize: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the carousel should loop around. */
  readonly loop: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether mouse dragging is enabled. */
  readonly allowMouseDrag: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to scroll automatically. */
  readonly autoplay: InputSignalWithTransform<boolean | { delay: number } | undefined, unknown> = input<
    boolean | { delay: number } | undefined,
    unknown
  >(undefined, { transform: autoplayAttribute })
  /** The carousel orientation. */
  readonly orientation: InputSignal<carousel.Props['orientation']> = input<carousel.Props['orientation']>(undefined)
  /** The amount of space between items. */
  readonly spacing: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Extra space around the scrollable area. */
  readonly padding: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The threshold for determining if an item is in view. */
  readonly inViewThreshold: InputSignal<number | number[] | undefined> = input<number | number[] | undefined>(undefined)
  /** The snap type of the item group. */
  readonly snapType: InputSignal<carousel.Props['snapType']> = input<carousel.Props['snapType']>(undefined)
  /** Localized strings for accessibility labels. */
  readonly translations: InputSignal<CarouselIntlTranslations | undefined> = input<
    CarouselIntlTranslations | undefined
  >(undefined)

  /** Emits details when the current page changes. */
  readonly pageDetailsChange: OutputEmitterRef<CarouselPageChangeDetails> = output<CarouselPageChangeDetails>()
  /** Emits details when dragging starts, moves, or ends. */
  readonly dragStatusChange: OutputEmitterRef<CarouselDragStatusDetails> = output<CarouselDragStatusDetails>()
  /** Emits details when autoplay starts, advances, or stops. */
  readonly autoplayStatusChange: OutputEmitterRef<CarouselAutoplayStatusDetails> =
    output<CarouselAutoplayStatusDetails>()

  private lastPageDetails: number | undefined

  private readonly machine = useCarousel({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      page: this.page(),
      defaultPage: this.defaultPage(),
      slideCount: this.slideCount(),
      slidesPerPage: this.slidesPerPage(),
      slidesPerMove: this.slidesPerMove(),
      autoSize: this.autoSize(),
      loop: this.loop(),
      allowMouseDrag: this.allowMouseDrag(),
      autoplay: this.autoplay(),
      orientation: this.orientation(),
      spacing: this.spacing(),
      padding: this.padding(),
      inViewThreshold: this.inViewThreshold(),
      snapType: this.snapType(),
      translations: this.translations(),
      onPageChange: (details) => {
        const currentPage = this.page()
        if (currentPage !== undefined && currentPage !== details.page) {
          this.page.set(details.page)
        }
        if (this.lastPageDetails !== details.page) {
          this.lastPageDetails = details.page
          this.pageDetailsChange.emit(details)
        }
      },
      onDragStatusChange: (details) => {
        this.dragStatusChange.emit(details)
      },
      onAutoplayStatusChange: (details) => {
        this.autoplayStatusChange.emit(details)
      },
    }),
  })

  readonly state: Signal<carousel.Service['state']> = this.machine.state
  readonly api: Signal<carousel.Api> = this.machine.api
  readonly service: carousel.Service = this.machine.service
  readonly send: carousel.Service['send'] = this.machine.send

  constructor() {
    const destroyRef = inject(DestroyRef)
    let destroyed = false
    let hasObservedSlideCount = false
    let previousSlideCount: number | undefined
    destroyRef.onDestroy(() => {
      destroyed = true
    })

    effect(() => {
      const slideCount = this.slideCount()
      if (!hasObservedSlideCount) {
        hasObservedSlideCount = true
        previousSlideCount = slideCount
        return
      }
      if (Object.is(previousSlideCount, slideCount)) return
      previousSlideCount = slideCount
      const win = this.service.scope.getWin()
      const scheduleMicrotask = win.queueMicrotask?.bind(win) ?? queueMicrotask
      scheduleMicrotask(() => {
        if (!destroyed) this.api().refresh()
      })
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef,
      props: () => this.api().getRootProps(),
    })
  }
}
