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
  selector: 'carousel-scroll-to-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCarouselRoot,
    ArkCarouselContext,
    ArkCarouselItemGroup,
    ArkCarouselItem,
    ArkCarouselControl,
    ArkCarouselPrevTrigger,
    ArkCarouselNextTrigger,
    ArkCarouselIndicatorGroup,
    ArkCarouselIndicator,
  ],
  template: `
    <div arkCarousel class="Root" [slideCount]="slides.length">
      <ng-template arkCarouselContext let-api>
        <button type="button" class="Button" (click)="api().scrollToIndex(3)">Go to slide 4</button>
      </ng-template>
      <div arkCarouselItemGroup class="ItemGroup">
        @for (slide of slides; track $index; let index = $index) {
          <div arkCarouselItem class="Item" [index]="index">
            <div class="Slide">Slide {{ index + 1 }}</div>
          </div>
        }
      </div>
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
      <div arkCarouselIndicatorGroup class="IndicatorGroup">
        @for (slide of slides; track $index; let index = $index) {
          <button type="button" arkCarouselIndicator class="Indicator" [index]="index"></button>
        }
      </div>
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselScrollToExample {
  readonly slides = Array.from({ length: 5 })
}
