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
import type * as menu from '@zag-js/menu'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_MENU_CONTEXT, ARK_MENU_CONTEXT_CARRIER } from './use-menu-context'
import type { UseMenuReturn } from './use-menu'

@Directive({
  selector: '[arkMenuRootProvider]',
  standalone: true,
  exportAs: 'arkMenuRootProvider',
  providers: [
    { provide: ARK_MENU_CONTEXT, useExisting: forwardRef(() => ArkMenuRootProvider) },
    {
      provide: ARK_MENU_CONTEXT_CARRIER,
      useFactory: (provider: ArkMenuRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkMenuRootProvider)],
    },
  ],
})
export class ArkMenuRootProvider implements UseMenuReturn {
  /** The menu machine returned by useMenu(). */
  readonly value: InputSignal<UseMenuReturn> = input.required<UseMenuReturn>()
  readonly state: Signal<menu.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<menu.Api> = computed(() => this.value().api())
  readonly send: menu.Service['send'] = (event) => this.value().send(event)

  get service(): menu.Service {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkMenuRootProvider> = buildRootCarrier<ArkMenuRootProvider>({
    root: this,
    rootToken: ARK_MENU_CONTEXT as ProviderToken<ArkMenuRootProvider>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Exposed for menu part directives to consume via ARK_MENU_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkMenuRootProvider> {
    return this.arkContextCarrier
  }
}
