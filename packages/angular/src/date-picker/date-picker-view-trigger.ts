import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDatePickerContext, injectArkDatePickerViewContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerViewTrigger]',
  standalone: true,
  exportAs: 'arkDatePickerViewTrigger',
})
export class ArkDatePickerViewTrigger {
  constructor() {
    const context = injectArkDatePickerContext()
    const view = injectArkDatePickerViewContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getViewTriggerProps(view()),
    })
  }
}
