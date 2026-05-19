import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type ProviderToken,
  type Signal,
} from '@angular/core'
import type * as tabs from '@zag-js/tabs'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_TABS_CONTEXT, ARK_TABS_CONTEXT_CARRIER } from './use-tabs-context'
import type { UseTabsReturn } from './use-tabs'

@Directive({
  selector: '[arkTabsRootProvider]',
  standalone: true,
  exportAs: 'arkTabsRootProvider',
  providers: [
    { provide: ARK_TABS_CONTEXT, useExisting: forwardRef(() => ArkTabsRootProvider) },
    {
      provide: ARK_TABS_CONTEXT_CARRIER,
      useFactory: (provider: ArkTabsRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkTabsRootProvider)],
    },
  ],
})
export class ArkTabsRootProvider implements UseTabsReturn {
  /** The tabs machine returned by useTabs(). */
  readonly value: InputSignal<UseTabsReturn> = input.required<UseTabsReturn>()
  readonly state: Signal<tabs.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<tabs.Api> = computed(() => this.value().api())
  readonly mountedValues: Signal<ReadonlySet<string>> = computed(() => this.value().mountedValues())
  readonly send: tabs.Service['send'] = (event) => this.value().send(event)

  get service(): tabs.Service {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkTabsRootProvider> = buildRootCarrier<ArkTabsRootProvider>({
    root: this,
    rootToken: ARK_TABS_CONTEXT as ProviderToken<ArkTabsRootProvider>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }

  /** @internal Exposed for tabs part directives to consume via ARK_TABS_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkTabsRootProvider> {
    return this.arkContextCarrier
  }

  isContentUnmounted(value: string): boolean {
    return this.value().isContentUnmounted(value)
  }
}
