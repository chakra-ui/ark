import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkMarqueeContent, ArkMarqueeItem, ArkMarqueeRoot, ArkMarqueeViewport } from '../public-api'
import { marqueeExampleItems } from '../marquee-example-data'
import { marqueeExampleStyles } from '../marquee-example-styles'

@Component({
  selector: 'marquee-reverse-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkMarqueeRoot, ArkMarqueeViewport, ArkMarqueeContent, ArkMarqueeItem],
  template: `
    <div arkMarquee reverse class="marquee-root">
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
  `,
  styles: [marqueeExampleStyles],
})
export class MarqueeReverseExample {
  readonly items = marqueeExampleItems
}
