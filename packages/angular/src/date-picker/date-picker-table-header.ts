import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDatePickerContext, injectArkDatePickerTableContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerTableHeader]',
  standalone: true,
  exportAs: 'arkDatePickerTableHeader',
})
export class ArkDatePickerTableHeader {
  constructor() {
    const context = injectArkDatePickerContext()
    const table = injectArkDatePickerTableContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTableHeaderProps(table()),
    })
  }
}
