import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkMarqueeContent, ArkMarqueeItem, ArkMarqueeRoot, ArkMarqueeViewport } from '../public-api'
import { marqueeExampleItems } from '../marquee-example-data'
import { marqueeExampleStyles } from '../marquee-example-styles'

@Component({
  selector: 'marquee-vertical-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkMarqueeRoot, ArkMarqueeViewport, ArkMarqueeContent, ArkMarqueeItem],
  template: `
    <div arkMarquee side="bottom" class="Root">
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
  `,
  styles: [marqueeExampleStyles],
})
export class MarqueeVerticalExample {
  readonly items = marqueeExampleItems
}
