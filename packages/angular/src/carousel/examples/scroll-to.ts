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
        @for (slide of slides; track slide; let index = $index) {
          <div arkCarouselItem class="Item" [index]="index">
            <div class="Slide">Slide {{ index + 1 }}</div>
          </div>
        }
      </div>
      <div arkCarouselControl class="Control">
        <button type="button" arkCarouselPrevTrigger class="Trigger">&lt;</button>
        <button type="button" arkCarouselNextTrigger class="Trigger">&gt;</button>
      </div>
      <div arkCarouselIndicatorGroup class="IndicatorGroup">
        @for (slide of slides; track slide; let index = $index) {
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
