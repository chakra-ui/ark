import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
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
  selector: 'carousel-dynamic-slides-example',
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
  ],
  template: `
    <div class="stack">
      <div arkCarousel class="Root" [slideCount]="slides().length" [(page)]="page">
        <div arkCarouselItemGroup class="ItemGroup">
          @for (slide of slides(); track slide; let index = $index) {
            <div arkCarouselItem class="Item" [index]="index">
              <div class="Slide">Slide {{ slide + 1 }}</div>
            </div>
          }
        </div>
        <div arkCarouselControl class="Control">
          <button type="button" arkCarouselPrevTrigger class="Trigger">&lt;</button>
          <div arkCarouselIndicatorGroup class="IndicatorGroup">
            @for (slide of slides(); track slide; let index = $index) {
              <button type="button" arkCarouselIndicator class="Indicator" [index]="index"></button>
            }
          </div>
          <button type="button" arkCarouselNextTrigger class="Trigger">&gt;</button>
        </div>
      </div>
      <button type="button" class="Button" (click)="addSlide()">Add slide</button>
    </div>
  `,
  styles: [carouselExampleStyles],
})
export class CarouselDynamicSlidesExample {
  readonly slides = signal([0, 1, 2, 3, 4])
  readonly page = signal<number | undefined>(0)

  addSlide(): void {
    this.slides.update((slides) => [...slides, Math.max(...slides) + 1])
  }
}
