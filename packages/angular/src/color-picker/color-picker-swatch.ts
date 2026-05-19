import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core'
import type * as colorPicker from '@zag-js/color-picker'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_COLOR_PICKER_SWATCH_PROPS } from './color-picker-part-context'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerSwatch]',
  standalone: true,
  exportAs: 'arkColorPickerSwatch',
  providers: [
    {
      provide: ARK_COLOR_PICKER_SWATCH_PROPS,
      useFactory: (swatch: ArkColorPickerSwatch) => swatch.swatchProps,
      deps: [forwardRef(() => ArkColorPickerSwatch)],
    },
  ],
})
export class ArkColorPickerSwatch {
  /** The swatch color value. */
  readonly value: InputSignal<string | colorPicker.Color> = input.required<string | colorPicker.Color>()
  /** Whether to include the alpha channel in the rendered swatch color. */
  readonly respectAlpha: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })

  readonly swatchProps: Signal<colorPicker.SwatchProps> = computed(() => ({
    value: this.value(),
    respectAlpha: this.respectAlpha(),
  }))

  constructor() {
    const context = injectArkColorPickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getSwatchProps(this.swatchProps()),
    })
  }
}
