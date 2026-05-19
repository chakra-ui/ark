import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDatePickerContext, injectArkDatePickerTableContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerTableRow]',
  standalone: true,
  exportAs: 'arkDatePickerTableRow',
})
export class ArkDatePickerTableRow {
  constructor() {
    const context = injectArkDatePickerContext()
    const table = injectArkDatePickerTableContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTableRowProps(table()),
    })
  }
}
