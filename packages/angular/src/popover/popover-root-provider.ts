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
import type * as popover from '@zag-js/popover'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_POPOVER_CONTEXT, ARK_POPOVER_CONTEXT_CARRIER } from './use-popover-context'
import type { UsePopoverReturn } from './use-popover'

@Directive({
  selector: '[arkPopoverRootProvider]',
  standalone: true,
  exportAs: 'arkPopoverRootProvider',
  providers: [
    { provide: ARK_POPOVER_CONTEXT, useExisting: forwardRef(() => ArkPopoverRootProvider) },
    {
      provide: ARK_POPOVER_CONTEXT_CARRIER,
      useFactory: (provider: ArkPopoverRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkPopoverRootProvider)],
    },
  ],
})
export class ArkPopoverRootProvider implements UsePopoverReturn {
  /** The popover machine returned by usePopover(). */
  readonly value: InputSignal<UsePopoverReturn> = input.required<UsePopoverReturn>()
  readonly state: Signal<popover.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<popover.Api> = computed(() => this.value().api())
  readonly send: popover.Service['send'] = (event) => this.value().send(event)

  get service(): popover.Service {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkPopoverRootProvider> =
    buildRootCarrier<ArkPopoverRootProvider>({
      root: this,
      rootToken: ARK_POPOVER_CONTEXT as ProviderToken<ArkPopoverRootProvider>,
      originInjector: inject(Injector),
      environmentInjector: inject(EnvironmentInjector),
    })

  /** @internal Exposed for popover part directives to consume via ARK_POPOVER_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkPopoverRootProvider> {
    return this.arkContextCarrier
  }
}
