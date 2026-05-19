import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDatePickerContext, injectArkDatePickerTableContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerWeekNumberHeaderCell]',
  standalone: true,
  exportAs: 'arkDatePickerWeekNumberHeaderCell',
})
export class ArkDatePickerWeekNumberHeaderCell {
  constructor() {
    const context = injectArkDatePickerContext()
    const table = injectArkDatePickerTableContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getWeekNumberHeaderCellProps(table()),
    })
  }
}
