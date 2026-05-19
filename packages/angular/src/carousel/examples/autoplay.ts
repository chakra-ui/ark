import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCarouselAutoplayTrigger,
  ArkCarouselContext,
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
    ArkCarouselContext,
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
        <button type="button" arkCarouselPrevTrigger class="Trigger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button type="button" arkCarouselAutoplayTrigger class="AutoplayTrigger">
          <ng-template arkCarouselContext let-api>
            @if (api().isPlaying) {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            } @else {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            }
          </ng-template>
        </button>
        <button type="button" arkCarouselNextTrigger class="Trigger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselAutoplayExample {
  readonly images = images
}
