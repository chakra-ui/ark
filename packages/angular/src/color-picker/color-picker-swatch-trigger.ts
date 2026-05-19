import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
} from '@angular/core'
import type * as colorPicker from '@zag-js/color-picker'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: 'button[arkColorPickerSwatchTrigger]',
  standalone: true,
  exportAs: 'arkColorPickerSwatchTrigger',
})
export class ArkColorPickerSwatchTrigger {
  /** The swatch color value to select. */
  readonly value: InputSignal<string | colorPicker.Color> = input.required<string | colorPicker.Color>()
  /** Whether the swatch trigger is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  constructor() {
    const context = injectArkColorPickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getSwatchTriggerProps({ value: this.value(), disabled: this.disabled() }),
    })
  }
}
