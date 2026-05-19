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
    <div arkMarquee autoFill spacing="2rem" class="marquee-root">
      <div arkMarqueeViewport class="marquee-viewport">
        <ng-container *arkMarqueeContext="let marquee">
          @for (_ of contentCopies(marquee().contentCount); track $index) {
            <div arkMarqueeContent [index]="$index" class="marquee-content">
              @for (item of compactItems; track item.code) {
                <div arkMarqueeItem class="marquee-item">
                  <span class="marquee-code">{{ item.code }}</span>
                  <span>{{ item.name }}</span>
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
