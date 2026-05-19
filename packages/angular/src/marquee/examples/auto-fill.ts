import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkMarqueeContent, ArkMarqueeContext, ArkMarqueeItem, ArkMarqueeRoot, ArkMarqueeViewport } from '../public-api'
import { marqueeExampleItems } from '../marquee-example-data'
import { marqueeExampleStyles } from '../marquee-example-styles'

@Component({
  selector: 'marquee-auto-fill-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkMarqueeRoot, ArkMarqueeViewport, ArkMarqueeContent, ArkMarqueeItem, ArkMarqueeContext],
  template: `
    <div arkMarquee autoFill spacing="2rem" class="Root">
      <div arkMarqueeViewport class="Viewport">
        <ng-container *arkMarqueeContext="let marquee">
          @for (_ of contentCopies(marquee().contentCount); track $index) {
            <div arkMarqueeContent [index]="$index" class="Content">
              @for (item of compactItems; track item.name) {
                <div arkMarqueeItem class="Item">
                  <span class="ItemLogo">{{ item.logo }}</span>
                  <span class="ItemName">{{ item.name }}</span>
                </div>
              }
            </div>
          }
        </ng-container>
      </div>
    </div>
  `,
  styles: [marqueeExampleStyles],
})
export class MarqueeAutoFillExample {
  readonly compactItems = marqueeExampleItems.slice(0, 3)

  contentCopies(count: number): undefined[] {
    return Array.from({ length: count })
  }
}
