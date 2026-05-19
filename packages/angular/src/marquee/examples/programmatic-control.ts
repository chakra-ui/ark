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
    <div class="marquee-stack">
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
      <div class="marquee-controls">
        <button type="button" class="marquee-button" (click)="marquee.api().pause()">Pause</button>
        <button type="button" class="marquee-button" (click)="marquee.api().resume()">Resume</button>
        <button type="button" class="marquee-button" (click)="marquee.api().restart()">Restart</button>
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
