import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { DatePickerPresetTriggerValue } from './date-picker.types'
import { injectArkDatePickerContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerPresetTrigger]',
  standalone: true,
  exportAs: 'arkDatePickerPresetTrigger',
})
export class ArkDatePickerPresetTrigger {
  /** The preset range or date values to select. */
  readonly value: InputSignal<DatePickerPresetTriggerValue> = input.required<DatePickerPresetTriggerValue>()

  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getPresetTriggerProps({ value: this.value() }),
    })
  }
}
