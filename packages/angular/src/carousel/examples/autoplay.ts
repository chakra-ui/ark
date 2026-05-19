import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCarouselAutoplayIndicator,
  ArkCarouselAutoplayTrigger,
  ArkCarouselItem,
  ArkCarouselItemGroup,
  ArkCarouselRoot,
} from '@ark-ui/angular/carousel'
import { carouselExampleStyles } from '../carousel-example-styles'

@Component({
  selector: 'carousel-autoplay-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCarouselRoot,
    ArkCarouselItemGroup,
    ArkCarouselItem,
    ArkCarouselAutoplayTrigger,
    ArkCarouselAutoplayIndicator,
  ],
  template: `
    <div arkCarousel [slideCount]="slides.length" [autoplay]="{ delay: 2000 }" loop>
      <div arkCarouselItemGroup>
        @for (slide of slides; track slide; let index = $index) {
          <div arkCarouselItem [index]="index">{{ slide }}</div>
        }
      </div>
      <button type="button" arkCarouselAutoplayTrigger>
        <span arkCarouselAutoplayIndicator label="Pause" fallback="Play"></span>
      </button>
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselAutoplayExample {
  readonly slides = ['01', '02', '03']
}
