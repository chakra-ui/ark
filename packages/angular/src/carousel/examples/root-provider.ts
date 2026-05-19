import { ChangeDetectionStrategy, Component, Injector, computed, inject, runInInjectionContext } from '@angular/core'
import {
  ArkCarouselItem,
  ArkCarouselItemGroup,
  ArkCarouselNextTrigger,
  ArkCarouselPrevTrigger,
  ArkCarouselRootProvider,
  type UseCarouselReturn,
  useCarousel,
} from '@ark-ui/angular/carousel'
import { carouselExampleStyles } from '../carousel-example-styles'

@Component({
  selector: 'carousel-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCarouselRootProvider,
    ArkCarouselItemGroup,
    ArkCarouselItem,
    ArkCarouselPrevTrigger,
    ArkCarouselNextTrigger,
  ],
  template: `
    <div class="stack">
      <p>Page {{ pageLabel() }}</p>
      <div arkCarouselRootProvider [value]="carousel">
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
export class CarouselRootProviderExample {
  readonly slides = ['01', '02', '03']
  readonly carousel: UseCarouselReturn = runInInjectionContext(inject(Injector), () =>
    useCarousel({ context: () => ({ slideCount: this.slides.length }) }),
  )
  readonly pageLabel = computed(() => this.carousel.api().page + 1)
}
