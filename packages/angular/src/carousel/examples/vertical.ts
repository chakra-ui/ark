import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCarouselItem,
  ArkCarouselItemGroup,
  ArkCarouselNextTrigger,
  ArkCarouselPrevTrigger,
  ArkCarouselRoot,
} from '@ark-ui/angular/carousel'
import { carouselExampleStyles } from '../carousel-example-styles'

@Component({
  selector: 'carousel-vertical-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkCarouselRoot, ArkCarouselItemGroup, ArkCarouselItem, ArkCarouselPrevTrigger, ArkCarouselNextTrigger],
  template: `
    <div arkCarousel orientation="vertical" [slideCount]="slides.length">
      <div arkCarouselItemGroup>
        @for (slide of slides; track slide; let index = $index) {
          <div arkCarouselItem [index]="index">{{ slide }}</div>
        }
      </div>
      <div>
        <button type="button" arkCarouselPrevTrigger>Prev</button>
        <button type="button" arkCarouselNextTrigger>Next</button>
      </div>
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselVerticalExample {
  readonly slides = ['01', '02', '03']
}
