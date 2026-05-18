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
import type * as drawer from '@zag-js/drawer'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_DRAWER_CONTEXT, ARK_DRAWER_CONTEXT_CARRIER } from './use-drawer-context'
import type { UseDrawerReturn } from './use-drawer'

@Directive({
  selector: '[arkDrawerRootProvider]',
  standalone: true,
  exportAs: 'arkDrawerRootProvider',
  providers: [
    { provide: ARK_DRAWER_CONTEXT, useExisting: forwardRef(() => ArkDrawerRootProvider) },
    {
      provide: ARK_DRAWER_CONTEXT_CARRIER,
      useFactory: (provider: ArkDrawerRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkDrawerRootProvider)],
    },
  ],
})
export class ArkDrawerRootProvider implements UseDrawerReturn {
  /** The drawer machine returned by useDrawer(). */
  readonly value: InputSignal<UseDrawerReturn> = input.required<UseDrawerReturn>()
  readonly state: Signal<drawer.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<drawer.Api> = computed(() => this.value().api())
  readonly send: drawer.Service['send'] = (event) => this.value().send(event)

  get service(): drawer.Service {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkDrawerRootProvider> =
    buildRootCarrier<ArkDrawerRootProvider>({
      root: this,
      rootToken: ARK_DRAWER_CONTEXT as ProviderToken<ArkDrawerRootProvider>,
      originInjector: inject(Injector),
      environmentInjector: inject(EnvironmentInjector),
    })

  /** @internal Exposed for drawer part directives to consume via ARK_DRAWER_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkDrawerRootProvider> {
    return this.arkContextCarrier
  }
}
