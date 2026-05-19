import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkMarqueeContent, ArkMarqueeEdge, ArkMarqueeItem, ArkMarqueeRoot, ArkMarqueeViewport } from '../public-api'
import { marqueeExampleItems } from '../marquee-example-data'
import { marqueeExampleStyles } from '../marquee-example-styles'

@Component({
  selector: 'marquee-with-edges-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkMarqueeRoot, ArkMarqueeViewport, ArkMarqueeContent, ArkMarqueeItem, ArkMarqueeEdge],
  template: `
    <div arkMarquee class="Root">
      <div arkMarqueeEdge side="start" class="Edge"></div>
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
      <div arkMarqueeEdge side="end" class="Edge"></div>
    </div>
  `,
  styles: [marqueeExampleStyles],
})
export class MarqueeWithEdgesExample {
  readonly items = marqueeExampleItems
}
