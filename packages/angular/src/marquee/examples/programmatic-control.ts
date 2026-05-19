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
  selector: 'marquee-programmatic-control-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkMarqueeRootProvider, ArkMarqueeViewport, ArkMarqueeContent, ArkMarqueeItem],
  template: `
    <div class="stack">
      <div arkMarqueeRootProvider [value]="marquee" class="Root">
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
      <div class="hstack">
        <button type="button" (click)="marquee.api().pause()">Pause</button>
        <button type="button" (click)="marquee.api().resume()">Resume</button>
      </div>
    </div>
  `,
  styles: [marqueeExampleStyles],
})
export class MarqueeProgrammaticControlExample {
  private readonly injector = inject(Injector)
  readonly items = marqueeExampleItems
  readonly marquee = runInInjectionContext(this.injector, () => useMarquee({ context: () => ({}) }))
}
