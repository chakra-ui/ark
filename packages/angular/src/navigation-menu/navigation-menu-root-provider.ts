import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  Renderer2,
  type InputSignal,
  type ProviderToken,
  type Signal,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import type * as navigationMenu from '@zag-js/navigation-menu'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_NAVIGATION_MENU_CONTEXT, ARK_NAVIGATION_MENU_CONTEXT_CARRIER } from './use-navigation-menu-context'
import type { UseNavigationMenuReturn } from './use-navigation-menu'

@Directive({
  selector: '[arkNavigationMenuRootProvider]',
  standalone: true,
  exportAs: 'arkNavigationMenuRootProvider',
  providers: [
    { provide: ARK_NAVIGATION_MENU_CONTEXT, useExisting: forwardRef(() => ArkNavigationMenuRootProvider) },
    {
      provide: ARK_NAVIGATION_MENU_CONTEXT_CARRIER,
      useFactory: (provider: ArkNavigationMenuRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkNavigationMenuRootProvider)],
    },
  ],
})
export class ArkNavigationMenuRootProvider implements UseNavigationMenuReturn {
  /** The navigation menu machine returned by useNavigationMenu(). */
  readonly value: InputSignal<UseNavigationMenuReturn> = input.required<UseNavigationMenuReturn>()
  readonly state: Signal<navigationMenu.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<navigationMenu.Api> = computed(() => this.value().api())
  readonly send: navigationMenu.Service['send'] = (event) => this.value().send(event)

  get service(): navigationMenu.Service {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkNavigationMenuRootProvider> =
    buildRootCarrier<ArkNavigationMenuRootProvider>({
      root: this,
      rootToken: ARK_NAVIGATION_MENU_CONTEXT as ProviderToken<ArkNavigationMenuRootProvider>,
      originInjector: inject(Injector),
      environmentInjector: inject(EnvironmentInjector),
    })

  /** @internal Exposed for navigation menu part directives to consume via ARK_NAVIGATION_MENU_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkNavigationMenuRootProvider> {
    return this.arkContextCarrier
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
