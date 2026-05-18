import {
  Directive,
  EnvironmentInjector,
  Injector,
  type InputSignal,
  type ProviderToken,
  type Signal,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import type * as hoverCard from '@zag-js/hover-card'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_HOVER_CARD_CONTEXT, ARK_HOVER_CARD_CONTEXT_CARRIER } from './use-hover-card-context'
import type { UseHoverCardReturn } from './use-hover-card'

@Directive({
  selector: '[arkHoverCardRootProvider]',
  standalone: true,
  exportAs: 'arkHoverCardRootProvider',
  providers: [
    { provide: ARK_HOVER_CARD_CONTEXT, useExisting: forwardRef(() => ArkHoverCardRootProvider) },
    {
      provide: ARK_HOVER_CARD_CONTEXT_CARRIER,
      useFactory: (provider: ArkHoverCardRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkHoverCardRootProvider)],
    },
  ],
})
export class ArkHoverCardRootProvider implements UseHoverCardReturn {
  /** The hover card machine returned by useHoverCard(). */
  readonly value: InputSignal<UseHoverCardReturn> = input.required<UseHoverCardReturn>()
  readonly state: Signal<hoverCard.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<hoverCard.Api> = computed(() => this.value().api())
  readonly send: hoverCard.Service['send'] = (event) => this.value().send(event)

  get service(): hoverCard.Service {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkHoverCardRootProvider> =
    buildRootCarrier<ArkHoverCardRootProvider>({
      root: this,
      rootToken: ARK_HOVER_CARD_CONTEXT as ProviderToken<ArkHoverCardRootProvider>,
      originInjector: inject(Injector),
      environmentInjector: inject(EnvironmentInjector),
    })

  /** @internal Exposed for hover card part directives to consume via ARK_HOVER_CARD_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkHoverCardRootProvider> {
    return this.arkContextCarrier
  }
}
