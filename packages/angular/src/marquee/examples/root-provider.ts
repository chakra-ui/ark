import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import {
  ArkMarqueeContent,
  ArkMarqueeItem,
  ArkMarqueeRootProvider,
  ArkMarqueeViewport,
  useMarquee,
} from '../public-api'
import { marqueeExampleItems } from '../marquee-example-data'
import { marqueeExampleStyles } from '../marquee-example-styles'

@Component({
  selector: 'marquee-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkMarqueeRootProvider, ArkMarqueeViewport, ArkMarqueeContent, ArkMarqueeItem],
  template: `
    <div arkMarqueeRootProvider [value]="marquee" class="marquee-root">
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
export class MarqueeRootProviderExample {
  private readonly injector = inject(Injector)
  readonly items = marqueeExampleItems
  readonly marquee = runInInjectionContext(this.injector, () => useMarquee({ context: () => ({ speed: 70 }) }))
}
