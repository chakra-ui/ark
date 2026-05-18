import { ChangeDetectionStrategy, Component, Injector, computed, inject, runInInjectionContext } from '@angular/core'
import {
  ArkHoverCardArrow,
  ArkHoverCardArrowTip,
  ArkHoverCardContent,
  ArkHoverCardPositioner,
  ArkHoverCardRootProvider,
  ArkHoverCardTrigger,
  useHoverCard,
  type UseHoverCardReturn,
} from '@ark-ui/angular/hover-card'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { hoverCardExampleStyles } from '../hover-card-example-styles'

@Component({
  selector: 'hover-card-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkHoverCardRootProvider,
    ArkHoverCardTrigger,
    ArkHoverCardPositioner,
    ArkHoverCardContent,
    ArkHoverCardArrow,
    ArkHoverCardArrowTip,
    ArkPortalComponent,
  ],
  template: `
    <div class="stack">
      <output>Open: {{ openLabel() }}</output>
      <div arkHoverCardRootProvider [value]="hoverCard" #provider="arkHoverCardRootProvider">
        <a arkHoverCardTrigger href="#profile">&#64;sarah_chen</a>
        <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
          <div arkHoverCardPositioner>
            <div arkHoverCardContent>
              <div arkHoverCardArrow>
                <div arkHoverCardArrowTip></div>
              </div>
              <p>Sarah Chen — Design Engineer at Acme Inc.</p>
            </div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [hoverCardExampleStyles],
})
export class HoverCardRootProviderExample {
  readonly hoverCard: UseHoverCardReturn = runInInjectionContext(inject(Injector), () =>
    useHoverCard({ context: () => ({}) }),
  )
  readonly openLabel = computed(() => (this.hoverCard.api().open ? 'open' : 'closed'))
}
