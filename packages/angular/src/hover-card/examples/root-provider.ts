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
        <p>
          Liked by
          <a arkHoverCardTrigger href="#profile">&#64;sarah_chen</a>
          and 3 others
        </p>
        <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
          <div arkHoverCardPositioner>
            <div arkHoverCardContent>
              <div arkHoverCardArrow>
                <div arkHoverCardArrowTip></div>
              </div>
              <div class="Body">
                <img class="Avatar" src="https://i.pravatar.cc/300?u=sarah" alt="Sarah Chen" />
                <div>
                  <p class="Name">Sarah Chen</p>
                  <p class="Username">&#64;sarah_chen</p>
                </div>
                <p class="Bio">Design Engineer at Acme Inc.</p>
              </div>
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
  readonly openLabel = computed(() => String(this.hoverCard.api().open))
}
