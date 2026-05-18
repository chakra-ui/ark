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
import type * as tooltip from '@zag-js/tooltip'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_TOOLTIP_CONTEXT, ARK_TOOLTIP_CONTEXT_CARRIER } from './use-tooltip-context'
import type { UseTooltipReturn } from './use-tooltip'

@Directive({
  selector: '[arkTooltipRootProvider]',
  standalone: true,
  exportAs: 'arkTooltipRootProvider',
  providers: [
    { provide: ARK_TOOLTIP_CONTEXT, useExisting: forwardRef(() => ArkTooltipRootProvider) },
    {
      provide: ARK_TOOLTIP_CONTEXT_CARRIER,
      useFactory: (provider: ArkTooltipRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkTooltipRootProvider)],
    },
  ],
})
export class ArkTooltipRootProvider implements UseTooltipReturn {
  /** The tooltip machine returned by useTooltip(). */
  readonly value: InputSignal<UseTooltipReturn> = input.required<UseTooltipReturn>()
  readonly state: Signal<tooltip.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<tooltip.Api> = computed(() => this.value().api())
  readonly send: tooltip.Service['send'] = (event) => this.value().send(event)

  get service(): tooltip.Service {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkTooltipRootProvider> =
    buildRootCarrier<ArkTooltipRootProvider>({
      root: this,
      rootToken: ARK_TOOLTIP_CONTEXT as ProviderToken<ArkTooltipRootProvider>,
      originInjector: inject(Injector),
      environmentInjector: inject(EnvironmentInjector),
    })

  /** @internal Exposed for tooltip part directives to consume via ARK_TOOLTIP_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkTooltipRootProvider> {
    return this.arkContextCarrier
  }
}
