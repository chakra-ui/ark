import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkMarqueeContent, ArkMarqueeItem, ArkMarqueeRoot, ArkMarqueeViewport } from '../public-api'
import { marqueeExampleItems } from '../marquee-example-data'
import { marqueeExampleStyles } from '../marquee-example-styles'

@Component({
  selector: 'marquee-finite-loops-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkMarqueeRoot, ArkMarqueeViewport, ArkMarqueeContent, ArkMarqueeItem],
  template: `
    <div class="stack">
      <div
        arkMarquee
        [loopCount]="3"
        (loopComplete)="loopCount.update(increment)"
        (complete)="completedCount.update(increment)"
        class="Root"
      >
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
      <div>
        <p>Loop completed: {{ loopCount() }} times</p>
        <p>Animation completed: {{ completedCount() }} times</p>
      </div>
    </div>
  `,
  styles: [marqueeExampleStyles],
})
export class MarqueeFiniteLoopsExample {
  readonly items = marqueeExampleItems
  readonly loopCount = signal(0)
  readonly completedCount = signal(0)
  readonly increment = (value: number) => value + 1
}
