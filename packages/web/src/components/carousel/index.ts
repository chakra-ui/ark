import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/carousel'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type {
  CarouselAutoplayIndicator,
  CarouselAutoplayTrigger,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
} from './parts.js'

export type { Api as CarouselApi } from '@zag-js/carousel'
export interface CarouselElement
  extends
    ActionMethods<Api, 'scrollNext' | 'scrollPrevious'>,
    RootElement<Api, Props>,
    Pick<Props, 'ids' | 'translations'>,
    StateProperties<Props, 'page'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-carousel': CarouselElement
    'ark-carousel-item': InstanceType<typeof CarouselItem>
    'ark-carousel-prev-trigger': InstanceType<typeof CarouselPrevTrigger>
    'ark-carousel-next-trigger': InstanceType<typeof CarouselNextTrigger>
    'ark-carousel-autoplay-trigger': InstanceType<typeof CarouselAutoplayTrigger>
    'ark-carousel-autoplay-indicator': InstanceType<typeof CarouselAutoplayIndicator>
    'ark-carousel-indicator-group': InstanceType<typeof CarouselIndicatorGroup>
    'ark-carousel-indicator': InstanceType<typeof CarouselIndicator>
    'ark-carousel-progress-text': InstanceType<typeof CarouselProgressText>
    'ark-carousel-control': InstanceType<typeof CarouselControl>
    'ark-carousel-item-group': InstanceType<typeof CarouselItemGroup>
  }
}

export type CarouselEventMap = CallbackEvents<Props>
