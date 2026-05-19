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
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core'
import type * as colorPicker from '@zag-js/color-picker'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_COLOR_PICKER_SWATCH_PROPS } from './color-picker-part-context'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerValueSwatch]',
  standalone: true,
  exportAs: 'arkColorPickerValueSwatch',
  providers: [
    {
      provide: ARK_COLOR_PICKER_SWATCH_PROPS,
      useFactory: (swatch: ArkColorPickerValueSwatch) => swatch.swatchProps,
      deps: [forwardRef(() => ArkColorPickerValueSwatch)],
    },
  ],
})
export class ArkColorPickerValueSwatch {
  /** Whether to include the alpha channel in the rendered swatch color. */
  readonly respectAlpha: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })

  private readonly context = injectArkColorPickerContext()
  readonly swatchProps: Signal<colorPicker.SwatchProps> = computed(() => ({
    value: this.context.api().valueAsString,
    respectAlpha: this.respectAlpha(),
  }))

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.context.api().getSwatchProps(this.swatchProps()),
    })
  }
}
