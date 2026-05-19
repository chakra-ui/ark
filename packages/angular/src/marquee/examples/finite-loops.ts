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
    <div class="marquee-stack">
      <div
        arkMarquee
        [loopCount]="3"
        (loopComplete)="loopCount.update(increment)"
        (complete)="completedCount.update(increment)"
        class="marquee-root"
      >
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
      <div class="marquee-meta">
        <span>Loops: {{ loopCount() }}</span>
        <span>Completed: {{ completedCount() }}</span>
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
