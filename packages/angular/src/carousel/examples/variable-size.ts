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

const items = [
  { id: '1', width: '120px', label: 'Small' },
  { id: '2', width: '200px', label: 'Medium Size' },
  { id: '3', width: '80px', label: 'XS' },
  { id: '4', width: '250px', label: 'Large Content Here' },
  { id: '5', width: '150px', label: 'Regular' },
]

@Component({
  selector: 'carousel-variable-size-example',
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
    <div arkCarousel class="Root" [slideCount]="items.length" autoSize spacing="8px">
      <div arkCarouselControl class="Control">
        <button type="button" arkCarouselPrevTrigger class="Trigger">&lt;</button>
        <button type="button" arkCarouselNextTrigger class="Trigger">&gt;</button>
      </div>
      <div arkCarouselItemGroup class="ItemGroup">
        @for (item of items; track item.id; let index = $index) {
          <div arkCarouselItem [index]="index" snapAlign="center">
            <div class="Slide" [style.width]="item.width" style="height: 6rem">{{ item.label }}</div>
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
export class CarouselVariableSizeExample {
  readonly items = items
}
