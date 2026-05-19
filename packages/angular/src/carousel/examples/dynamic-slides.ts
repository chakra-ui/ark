import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkCarouselItem,
  ArkCarouselItemGroup,
  ArkCarouselNextTrigger,
  ArkCarouselRoot,
} from '@ark-ui/angular/carousel'
import { carouselExampleStyles } from '../carousel-example-styles'

@Component({
  selector: 'carousel-dynamic-slides-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkCarouselRoot, ArkCarouselItemGroup, ArkCarouselItem, ArkCarouselNextTrigger],
  template: `
    <div class="stack">
      <button type="button" (click)="addSlide()">Add slide</button>
      <div arkCarousel [slideCount]="slides().length">
        <div arkCarouselItemGroup>
          @for (slide of slides(); track slide; let index = $index) {
            <div arkCarouselItem [index]="index">{{ slide }}</div>
          }
        </div>
        <button type="button" arkCarouselNextTrigger>Next</button>
      </div>
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselDynamicSlidesExample {
  readonly slides = signal(['01', '02', '03'])

  addSlide(): void {
    this.slides.update((slides) => [...slides, String(slides.length + 1).padStart(2, '0')])
  }
}
