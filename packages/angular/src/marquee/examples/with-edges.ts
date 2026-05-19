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
    <div arkMarquee class="marquee-root">
      <div arkMarqueeEdge side="start" class="marquee-edge"></div>
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
      <div arkMarqueeEdge side="end" class="marquee-edge"></div>
    </div>
  `,
  styles: [marqueeExampleStyles],
})
export class MarqueeWithEdgesExample {
  readonly items = marqueeExampleItems
}
