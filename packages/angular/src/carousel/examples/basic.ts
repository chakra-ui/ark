import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCarouselControl,
  ArkCarouselIndicator,
  ArkCarouselIndicatorGroup,
  ArkCarouselItem,
  ArkCarouselItemGroup,
  ArkCarouselNextTrigger,
  ArkCarouselPrevTrigger,
  ArkCarouselProgressText,
  ArkCarouselRoot,
} from '@ark-ui/angular/carousel'
import { carouselExampleStyles } from '../carousel-example-styles'

@Component({
  selector: 'carousel-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCarouselRoot,
    ArkCarouselItemGroup,
    ArkCarouselItem,
    ArkCarouselControl,
    ArkCarouselPrevTrigger,
    ArkCarouselNextTrigger,
    ArkCarouselIndicatorGroup,
    ArkCarouselIndicator,
    ArkCarouselProgressText,
  ],
  template: `
    <div arkCarousel [slideCount]="slides.length">
      <div arkCarouselItemGroup>
        @for (slide of slides; track slide; let index = $index) {
          <div arkCarouselItem [index]="index">{{ slide }}</div>
        }
      </div>
      <div arkCarouselControl>
        <button type="button" arkCarouselPrevTrigger>Prev</button>
        <span arkCarouselProgressText></span>
        <button type="button" arkCarouselNextTrigger>Next</button>
      </div>
      <div arkCarouselIndicatorGroup>
        @for (slide of slides; track slide; let index = $index) {
          <button type="button" arkCarouselIndicator [index]="index">{{ index + 1 }}</button>
        }
      </div>
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselBasicExample {
  readonly slides = ['01', '02', '03']
}
