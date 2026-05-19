import type { CollectionItem } from '@zag-js/collection'
import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  type ProviderToken,
  Renderer2,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier, type ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_SELECT_CONTEXT, ARK_SELECT_CONTEXT_CARRIER } from './use-select-context'
import type { SelectService } from './select.types'
import type { UseSelectApi, UseSelectReturn } from './use-select'

@Directive({
  selector: '[arkSelectRootProvider]',
  standalone: true,
  exportAs: 'arkSelectRootProvider',
  providers: [
    { provide: ARK_SELECT_CONTEXT, useExisting: forwardRef(() => ArkSelectRootProvider) },
    {
      provide: ARK_SELECT_CONTEXT_CARRIER,
      useFactory: (provider: ArkSelectRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkSelectRootProvider)],
    },
  ],
})
export class ArkSelectRootProvider<T extends CollectionItem = CollectionItem> implements UseSelectReturn<T> {
  /** The select primitive returned by useSelect(). */
  readonly value: InputSignal<UseSelectReturn<T>> = input.required<UseSelectReturn<T>>()

  get state(): Signal<SelectService<T>['state']> {
    return this.value().state
  }
  get api(): Signal<UseSelectApi<T>> {
    return this.value().api
  }
  get service(): SelectService<T> {
    return this.value().service
  }
  get send(): SelectService<T>['send'] {
    return this.value().send
  }

  resolveValue(): UseSelectReturn<T> {
    return this.value()
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkSelectRootProvider<T>> = buildRootCarrier<
    ArkSelectRootProvider<T>
  >({
    root: this,
    rootToken: ARK_SELECT_CONTEXT as ProviderToken<ArkSelectRootProvider<T>>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Exposed for select part directives to consume via ARK_SELECT_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkSelectRootProvider<T>> {
    return this.arkContextCarrier
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.value().api().getRootProps(),
    })
  }
}
