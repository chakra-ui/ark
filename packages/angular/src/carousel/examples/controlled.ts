import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkCarouselItem,
  ArkCarouselItemGroup,
  ArkCarouselNextTrigger,
  ArkCarouselPrevTrigger,
  ArkCarouselRoot,
} from '@ark-ui/angular/carousel'
import { carouselExampleStyles } from '../carousel-example-styles'

@Component({
  selector: 'carousel-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkCarouselRoot, ArkCarouselItemGroup, ArkCarouselItem, ArkCarouselPrevTrigger, ArkCarouselNextTrigger],
  template: `
    <div class="stack">
      <p>Page {{ page() + 1 }}</p>
      <div arkCarousel [slideCount]="slides.length" [(page)]="page">
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
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselControlledExample {
  readonly page = signal<number | undefined>(0)
  readonly slides = ['01', '02', '03']
}
