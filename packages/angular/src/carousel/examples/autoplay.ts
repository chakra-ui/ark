import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCarouselAutoplayIndicator,
  ArkCarouselAutoplayTrigger,
  ArkCarouselControl,
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
  selector: 'carousel-autoplay-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCarouselRoot,
    ArkCarouselItemGroup,
    ArkCarouselItem,
    ArkCarouselControl,
    ArkCarouselPrevTrigger,
    ArkCarouselNextTrigger,
    ArkCarouselAutoplayTrigger,
    ArkCarouselAutoplayIndicator,
  ],
  template: `
    <div arkCarousel class="Root" [slideCount]="images.length" autoplay loop>
      <div arkCarouselItemGroup class="ItemGroup">
        @for (image of images; track image.src; let index = $index) {
          <div arkCarouselItem class="Item" [index]="index">
            <img [src]="image.src" [alt]="image.alt" width="500" height="300" />
          </div>
        }
      </div>
      <div arkCarouselControl class="Control" data-justify="center">
        <button type="button" arkCarouselPrevTrigger class="Trigger">&lt;</button>
        <button type="button" arkCarouselAutoplayTrigger class="AutoplayTrigger">
          <span arkCarouselAutoplayIndicator label="||" fallback=">"></span>
        </button>
        <button type="button" arkCarouselNextTrigger class="Trigger">&gt;</button>
      </div>
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselAutoplayExample {
  readonly images = images
}
