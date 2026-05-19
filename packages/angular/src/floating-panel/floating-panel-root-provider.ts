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
import type * as floatingPanel from '@zag-js/floating-panel'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_FLOATING_PANEL_CONTEXT, ARK_FLOATING_PANEL_CONTEXT_CARRIER } from './use-floating-panel-context'
import type { UseFloatingPanelReturn } from './use-floating-panel'

@Directive({
  selector: '[arkFloatingPanelRootProvider]',
  standalone: true,
  exportAs: 'arkFloatingPanelRootProvider',
  providers: [
    { provide: ARK_FLOATING_PANEL_CONTEXT, useExisting: forwardRef(() => ArkFloatingPanelRootProvider) },
    {
      provide: ARK_FLOATING_PANEL_CONTEXT_CARRIER,
      useFactory: (provider: ArkFloatingPanelRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkFloatingPanelRootProvider)],
    },
  ],
})
export class ArkFloatingPanelRootProvider implements UseFloatingPanelReturn {
  /** The floating panel machine returned by useFloatingPanel(). */
  readonly value: InputSignal<UseFloatingPanelReturn> = input.required<UseFloatingPanelReturn>()
  readonly state: Signal<floatingPanel.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<floatingPanel.Api> = computed(() => this.value().api())
  readonly send: floatingPanel.Service['send'] = (event) => this.value().send(event)

  get service(): floatingPanel.Service {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkFloatingPanelRootProvider> =
    buildRootCarrier<ArkFloatingPanelRootProvider>({
      root: this,
      rootToken: ARK_FLOATING_PANEL_CONTEXT as ProviderToken<ArkFloatingPanelRootProvider>,
      originInjector: inject(Injector),
      environmentInjector: inject(EnvironmentInjector),
    })

  /** @internal Exposed for floating panel part directives to consume through ArkPortalComponent. */
  getContextCarrier(): ArkContextCarrier<ArkFloatingPanelRootProvider> {
    return this.arkContextCarrier
  }
}
