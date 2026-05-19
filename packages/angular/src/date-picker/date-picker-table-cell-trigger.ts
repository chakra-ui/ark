import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { DatePickerDayTableCellProps, DatePickerTableCellMachineProps } from './date-picker.types'
import {
  injectArkDatePickerContext,
  injectArkDatePickerTableCellContext,
  injectArkDatePickerViewContext,
} from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerTableCellTrigger]',
  standalone: true,
  exportAs: 'arkDatePickerTableCellTrigger',
})
export class ArkDatePickerTableCellTrigger {
  constructor() {
    const context = injectArkDatePickerContext()
    const view = injectArkDatePickerViewContext()
    const cell = injectArkDatePickerTableCellContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const api = context.api()
        const props = cell()
        if (view().view === 'day') return api.getDayTableCellTriggerProps(props as DatePickerDayTableCellProps)
        if (view().view === 'month') return api.getMonthTableCellTriggerProps(props as DatePickerTableCellMachineProps)
        return api.getYearTableCellTriggerProps(props as DatePickerTableCellMachineProps)
      },
    })
  }
}
