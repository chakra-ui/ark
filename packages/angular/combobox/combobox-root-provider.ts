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
import { ARK_COMBOBOX_CONTEXT, ARK_COMBOBOX_CONTEXT_CARRIER } from './use-combobox-context'
import type { ComboboxService } from './combobox.types'
import type { UseComboboxApi, UseComboboxReturn } from './use-combobox'

@Directive({
  selector: '[arkComboboxRootProvider]',
  standalone: true,
  exportAs: 'arkComboboxRootProvider',
  providers: [
    { provide: ARK_COMBOBOX_CONTEXT, useExisting: forwardRef(() => ArkComboboxRootProvider) },
    {
      provide: ARK_COMBOBOX_CONTEXT_CARRIER,
      useFactory: (provider: ArkComboboxRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkComboboxRootProvider)],
    },
  ],
})
export class ArkComboboxRootProvider<T extends CollectionItem = CollectionItem> implements UseComboboxReturn<T> {
  /** The combobox primitive returned by useCombobox(). */
  readonly value: InputSignal<UseComboboxReturn<T>> = input.required<UseComboboxReturn<T>>()

  get state(): Signal<ComboboxService<T>['state']> {
    return this.value().state
  }
  get api(): Signal<UseComboboxApi<T>> {
    return this.value().api
  }
  get service(): ComboboxService<T> {
    return this.value().service
  }
  get send(): ComboboxService<T>['send'] {
    return this.value().send
  }

  resolveValue(): UseComboboxReturn<T> {
    return this.value()
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkComboboxRootProvider<T>> = buildRootCarrier<
    ArkComboboxRootProvider<T>
  >({
    root: this,
    rootToken: ARK_COMBOBOX_CONTEXT as ProviderToken<ArkComboboxRootProvider<T>>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Exposed for combobox part directives to consume via ARK_COMBOBOX_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkComboboxRootProvider<T>> {
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
