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
import type * as datePicker from '@zag-js/date-picker'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_DATE_PICKER_CONTEXT, ARK_DATE_PICKER_CONTEXT_CARRIER } from './use-date-picker-context'
import type { UseDatePickerReturn } from './use-date-picker'

@Directive({
  selector: '[arkDatePickerRootProvider]',
  standalone: true,
  exportAs: 'arkDatePickerRootProvider',
  providers: [
    { provide: ARK_DATE_PICKER_CONTEXT, useExisting: forwardRef(() => ArkDatePickerRootProvider) },
    {
      provide: ARK_DATE_PICKER_CONTEXT_CARRIER,
      useFactory: (provider: ArkDatePickerRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkDatePickerRootProvider)],
    },
  ],
})
export class ArkDatePickerRootProvider implements UseDatePickerReturn {
  /** The date picker machine returned by useDatePicker(). */
  readonly value: InputSignal<UseDatePickerReturn> = input.required<UseDatePickerReturn>()
  readonly state: Signal<datePicker.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<datePicker.Api> = computed(() => this.value().api())
  readonly send: datePicker.Service['send'] = (event) => this.value().send(event)

  get service(): datePicker.Service {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkDatePickerRootProvider> =
    buildRootCarrier<ArkDatePickerRootProvider>({
      root: this,
      rootToken: ARK_DATE_PICKER_CONTEXT as ProviderToken<ArkDatePickerRootProvider>,
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

  /** @internal Exposed for date picker part directives to consume via ARK_DATE_PICKER_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkDatePickerRootProvider> {
    return this.arkContextCarrier
  }
}
