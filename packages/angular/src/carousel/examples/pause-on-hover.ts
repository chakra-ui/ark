import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCarouselContext,
  ArkCarouselControl,
  ArkCarouselIndicator,
  ArkCarouselIndicatorGroup,
  ArkCarouselItem,
  ArkCarouselItemGroup,
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
  selector: 'carousel-pause-on-hover-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCarouselRoot,
    ArkCarouselContext,
    ArkCarouselControl,
    ArkCarouselItemGroup,
    ArkCarouselItem,
    ArkCarouselIndicatorGroup,
    ArkCarouselIndicator,
  ],
  template: `
    <div arkCarousel class="Root" [slideCount]="images.length" autoplay loop>
      <div arkCarouselControl class="Control">
        <ng-template arkCarouselContext let-api>
          <span class="StatusText">Autoplay is: {{ api().isPlaying ? 'playing' : 'paused' }}</span>
        </ng-template>
      </div>
      <ng-template arkCarouselContext let-api>
        <div arkCarouselItemGroup class="ItemGroup" (pointerover)="api().pause()" (pointerleave)="api().play()">
          @for (image of images; track image.src; let index = $index) {
            <div arkCarouselItem class="Item" [index]="index">
              <img [src]="image.src" [alt]="image.alt" width="500" height="300" />
            </div>
          }
        </div>
      </ng-template>
      <div arkCarouselIndicatorGroup class="IndicatorGroup">
        @for (image of images; track image.src; let index = $index) {
          <button type="button" arkCarouselIndicator class="Indicator" [index]="index"></button>
        }
      </div>
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselPauseOnHoverExample {
  readonly images = images
}
