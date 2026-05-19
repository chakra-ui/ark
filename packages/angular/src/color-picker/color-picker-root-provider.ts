import type * as colorPicker from '@zag-js/color-picker'
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
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier, type ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_COLOR_PICKER_CONTEXT, ARK_COLOR_PICKER_CONTEXT_CARRIER } from './use-color-picker-context'
import type { UseColorPickerReturn } from './use-color-picker'

@Directive({
  selector: '[arkColorPickerRootProvider]',
  standalone: true,
  exportAs: 'arkColorPickerRootProvider',
  providers: [
    { provide: ARK_COLOR_PICKER_CONTEXT, useExisting: forwardRef(() => ArkColorPickerRootProvider) },
    {
      provide: ARK_COLOR_PICKER_CONTEXT_CARRIER,
      useFactory: (provider: ArkColorPickerRootProvider) => provider.getContextCarrier(),
      deps: [forwardRef(() => ArkColorPickerRootProvider)],
    },
  ],
})
export class ArkColorPickerRootProvider implements UseColorPickerReturn {
  /** The color picker machine returned by useColorPicker(). */
  readonly value: InputSignal<UseColorPickerReturn> = input.required<UseColorPickerReturn>()
  readonly state: Signal<colorPicker.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<colorPicker.Api> = computed(() => this.value().api())
  readonly send: colorPicker.Service['send'] = (event) => this.value().send(event)

  get service(): colorPicker.Service {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkColorPickerRootProvider> =
    buildRootCarrier<ArkColorPickerRootProvider>({
      root: this,
      rootToken: ARK_COLOR_PICKER_CONTEXT as ProviderToken<ArkColorPickerRootProvider>,
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

  /** @internal Exposed for color picker part directives to consume via ARK_COLOR_PICKER_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkColorPickerRootProvider> {
    return this.arkContextCarrier
  }
}
