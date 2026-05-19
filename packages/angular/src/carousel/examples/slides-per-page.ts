import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCarouselContext,
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

@Component({
  selector: 'carousel-slides-per-page-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCarouselRoot,
    ArkCarouselContext,
    ArkCarouselControl,
    ArkCarouselItemGroup,
    ArkCarouselItem,
    ArkCarouselPrevTrigger,
    ArkCarouselNextTrigger,
    ArkCarouselIndicatorGroup,
    ArkCarouselIndicator,
  ],
  template: `
    <div arkCarousel class="Root" [slideCount]="slides.length" [slidesPerPage]="2" spacing="20px">
      <div arkCarouselControl class="Control">
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
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
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
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div arkCarouselItemGroup class="ItemGroup">
        @for (slide of slides; track $index; let index = $index) {
          <div arkCarouselItem class="Item" [index]="index">
            <div class="Slide">Slide {{ index + 1 }}</div>
          </div>
        }
      </div>
      <ng-template arkCarouselContext let-api>
        <div arkCarouselIndicatorGroup class="IndicatorGroup">
          @for (snap of api().pageSnapPoints; track $index; let index = $index) {
            <button type="button" arkCarouselIndicator class="Indicator" [index]="index"></button>
          }
        </div>
      </ng-template>
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselSlidesPerPageExample {
  readonly slides = Array.from({ length: 6 })
}
