import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkMarqueeContent, ArkMarqueeItem, ArkMarqueeRoot, ArkMarqueeViewport } from '../public-api'
import { marqueeExampleItems } from '../marquee-example-data'
import { marqueeExampleStyles } from '../marquee-example-styles'

@Component({
  selector: 'marquee-pause-on-interaction-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkMarqueeRoot, ArkMarqueeViewport, ArkMarqueeContent, ArkMarqueeItem],
  template: `
    <div arkMarquee pauseOnInteraction class="Root">
      <div arkMarqueeViewport class="Viewport">
        <div arkMarqueeContent class="Content">
          @for (item of items; track item.name) {
            <button arkMarqueeItem type="button" class="Item">
              <span class="ItemLogo">{{ item.logo }}</span>
              <span class="ItemName">{{ item.name }}</span>
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [marqueeExampleStyles],
})
export class MarqueePauseOnInteractionExample {
  readonly items = marqueeExampleItems
}
