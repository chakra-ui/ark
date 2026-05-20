import type * as ratingGroup from '@zag-js/rating-group'
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
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_RATING_GROUP_CONTEXT } from './use-rating-group-context'
import type { UseRatingGroupReturn } from './use-rating-group'

@Directive({
  selector: '[arkRatingGroupRootProvider]',
  standalone: true,
  exportAs: 'arkRatingGroupRootProvider',
  providers: [{ provide: ARK_RATING_GROUP_CONTEXT, useExisting: forwardRef(() => ArkRatingGroupRootProvider) }],
})
export class ArkRatingGroupRootProvider implements UseRatingGroupReturn {
  /** The rating group primitive returned by useRatingGroup(). */
  readonly value: InputSignal<UseRatingGroupReturn> = input.required<UseRatingGroupReturn>()

  readonly state: Signal<ratingGroup.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<ratingGroup.Api> = computed(() => this.value().api())

  get service(): ratingGroup.Service {
    return this.value().service
  }
  get send(): ratingGroup.Service['send'] {
    return this.value().send
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
