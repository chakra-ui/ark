import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCarouselControl,
  ArkCarouselIndicator,
  ArkCarouselIndicatorGroup,
  ArkCarouselItem,
  ArkCarouselItemGroup,
  ArkCarouselNextTrigger,
  ArkCarouselPrevTrigger,
  ArkCarouselRoot,
} from '@ark-ui/angular/carousel'
import { carouselExampleStyles } from '../carousel-example-styles'

const images = [
  { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
  { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
  { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
  { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
]

@Component({
  selector: 'carousel-thumbnail-indicator-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCarouselRoot,
    ArkCarouselControl,
    ArkCarouselItemGroup,
    ArkCarouselItem,
    ArkCarouselPrevTrigger,
    ArkCarouselNextTrigger,
    ArkCarouselIndicatorGroup,
    ArkCarouselIndicator,
  ],
  template: `
    <div arkCarousel class="Root" [slideCount]="images.length" [defaultPage]="0">
      <div arkCarouselControl class="Control">
        <button type="button" arkCarouselPrevTrigger class="Trigger">&lt;</button>
        <div arkCarouselItemGroup class="ItemGroup">
          @for (image of images; track image.src; let index = $index) {
            <div arkCarouselItem class="Item" [index]="index">
              <img [src]="image.src" [alt]="image.alt" width="500" height="300" />
            </div>
          }
        </div>
        <button type="button" arkCarouselNextTrigger class="Trigger">&gt;</button>
      </div>
      <div arkCarouselIndicatorGroup class="IndicatorGroup">
        @for (image of images; track image.src; let index = $index) {
          <button type="button" arkCarouselIndicator class="ThumbnailIndicator" [index]="index">
            <img [src]="image.src" [alt]="image.alt" width="500" height="300" />
          </button>
        }
      </div>
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselThumbnailIndicatorExample {
  readonly images = images
}
