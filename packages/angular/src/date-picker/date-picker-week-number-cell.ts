import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { DateValue } from './date-picker.types'
import { injectArkDatePickerContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerWeekNumberCell]',
  standalone: true,
  exportAs: 'arkDatePickerWeekNumberCell',
})
export class ArkDatePickerWeekNumberCell {
  /** The week index in the visible month. */
  readonly weekIndex: InputSignal<number> = input.required<number>()
  /** The dates in the represented week. */
  readonly week: InputSignal<DateValue[]> = input.required<DateValue[]>()

  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getWeekNumberCellProps({ weekIndex: this.weekIndex(), week: this.week() }),
    })
  }
}
