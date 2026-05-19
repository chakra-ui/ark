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
    <div class="marquee-stack">
      @for (speed of speeds; track speed.label) {
        <section>
          <h3>{{ speed.label }}</h3>
          <div arkMarquee [speed]="speed.value" class="marquee-root">
            <div arkMarqueeViewport class="marquee-viewport">
              <div arkMarqueeContent class="marquee-content">
                @for (item of items; track item.code) {
                  <div arkMarqueeItem class="marquee-item">
                    <span class="marquee-code">{{ item.code }}</span>
                    <span>{{ item.name }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
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
