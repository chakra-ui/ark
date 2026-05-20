import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  numberAttribute,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { RatingGroupItemProps, RatingGroupItemState } from './rating-group.types'
import { injectArkRatingGroupContext } from './use-rating-group-context'
import { ARK_RATING_GROUP_ITEM_CONTEXT, ARK_RATING_GROUP_ITEM_PROPS_CONTEXT } from './use-rating-group-item-context'

@Directive({
  selector: '[arkRatingGroupItem]',
  standalone: true,
  exportAs: 'arkRatingGroupItem',
  providers: [
    {
      provide: ARK_RATING_GROUP_ITEM_PROPS_CONTEXT,
      useFactory: (item: ArkRatingGroupItem) => item.itemProps,
      deps: [forwardRef(() => ArkRatingGroupItem)],
    },
    {
      provide: ARK_RATING_GROUP_ITEM_CONTEXT,
      useFactory: (item: ArkRatingGroupItem) => item.itemState,
      deps: [forwardRef(() => ArkRatingGroupItem)],
    },
  ],
})
export class ArkRatingGroupItem {
  /** The rating value represented by this item. */
  readonly index: InputSignalWithTransform<number, unknown> = input.required<number, unknown>({
    transform: numberAttribute,
  })

  private readonly ratingGroup = injectArkRatingGroupContext()
  readonly itemProps: Signal<RatingGroupItemProps> = computed(() => ({ index: this.index() }))
  readonly itemState: Signal<RatingGroupItemState> = computed(() =>
    this.ratingGroup.api().getItemState(this.itemProps()),
  )

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.ratingGroup.api().getItemProps(this.itemProps()),
    })
  }
}
