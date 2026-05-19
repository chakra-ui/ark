import type * as navigationMenu from '@zag-js/navigation-menu'
import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  Renderer2,
  type ProviderToken,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { NavigationMenuElementIds, NavigationMenuIntlTranslations } from './navigation-menu.types'
import { ARK_NAVIGATION_MENU_CONTEXT, ARK_NAVIGATION_MENU_CONTEXT_CARRIER } from './use-navigation-menu-context'
import { useNavigationMenu, type UseNavigationMenuReturn } from './use-navigation-menu'

@Directive({
  selector: '[arkNavigationMenu]',
  standalone: true,
  exportAs: 'arkNavigationMenu',
  providers: [
    { provide: ARK_NAVIGATION_MENU_CONTEXT, useExisting: forwardRef(() => ArkNavigationMenuRoot) },
    {
      provide: ARK_NAVIGATION_MENU_CONTEXT_CARRIER,
      useFactory: (root: ArkNavigationMenuRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkNavigationMenuRoot)],
    },
  ],
})
export class ArkNavigationMenuRoot implements UseNavigationMenuReturn {
  /** The unique identifier of the navigation menu. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the navigation menu. Useful for composition. */
  readonly ids: InputSignal<Partial<NavigationMenuElementIds> | undefined> = input<
    Partial<NavigationMenuElementIds> | undefined
  >(undefined)
  /** The controlled value of the currently-open item. */
  readonly value: ModelSignal<string | undefined> = model<string | undefined>(undefined)
  /** The initial value when uncontrolled. */
  readonly defaultValue: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The orientation of the navigation menu. */
  readonly orientation: InputSignal<navigationMenu.Props['orientation']> =
    input<navigationMenu.Props['orientation']>(undefined)
  /** The delay before the navigation menu opens. */
  readonly openDelay: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The delay before the navigation menu closes. */
  readonly closeDelay: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Whether to disable the click trigger. */
  readonly disableClickTrigger: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  })
  /** Whether to disable the hover trigger. */
  readonly disableHoverTrigger: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  })
  /** Whether to disable closing the menu when the pointer leaves. */
  readonly disablePointerLeaveClose: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  })
  /** Localized strings for accessibility labels. */
  readonly translations: InputSignal<NavigationMenuIntlTranslations | undefined> = input<
    NavigationMenuIntlTranslations | undefined
  >(undefined)

  private readonly machine = useNavigationMenu({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      orientation: this.orientation(),
      openDelay: this.openDelay(),
      closeDelay: this.closeDelay(),
      disableClickTrigger: this.disableClickTrigger(),
      disableHoverTrigger: this.disableHoverTrigger(),
      disablePointerLeaveClose: this.disablePointerLeaveClose(),
      translations: this.translations(),
      onValueChange: (details) => {
        if (this.value() === details.value) return
        this.value.set(details.value)
      },
    }),
  })

  readonly state: Signal<navigationMenu.Service['state']> = this.machine.state
  readonly api: Signal<navigationMenu.Api> = this.machine.api
  readonly service: navigationMenu.Service = this.machine.service
  readonly send: navigationMenu.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkNavigationMenuRoot> =
    buildRootCarrier<ArkNavigationMenuRoot>({
      root: this,
      rootToken: ARK_NAVIGATION_MENU_CONTEXT as ProviderToken<ArkNavigationMenuRoot>,
      originInjector: inject(Injector),
      environmentInjector: inject(EnvironmentInjector),
    })

  /** @internal Exposed for navigation menu part directives to consume via ARK_NAVIGATION_MENU_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkNavigationMenuRoot> {
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
