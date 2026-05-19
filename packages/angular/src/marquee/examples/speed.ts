import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkMarqueeContent, ArkMarqueeItem, ArkMarqueeRoot, ArkMarqueeViewport } from '../public-api'
import { marqueeExampleItems } from '../marquee-example-data'
import { marqueeExampleStyles } from '../marquee-example-styles'

@Component({
  selector: 'marquee-speed-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkMarqueeRoot, ArkMarqueeViewport, ArkMarqueeContent, ArkMarqueeItem],
  template: `
    <div class="stack">
      @for (speed of speeds; track speed.label) {
        <div>
          <h3>{{ speed.label }}</h3>
          <div arkMarquee [speed]="speed.value" class="Root">
            <div arkMarqueeViewport class="Viewport">
              <div arkMarqueeContent class="Content">
                @for (item of items; track item.name) {
                  <div arkMarqueeItem class="Item">
                    <span class="ItemLogo">{{ item.logo }}</span>
                    <span class="ItemName">{{ item.name }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [marqueeExampleStyles],
})
export class MarqueeSpeedExample {
  readonly items = marqueeExampleItems
  readonly speeds = [
    { label: 'Slow (25px/s)', value: 25 },
    { label: 'Normal (50px/s)', value: 50 },
    { label: 'Fast (100px/s)', value: 100 },
  ]
}
