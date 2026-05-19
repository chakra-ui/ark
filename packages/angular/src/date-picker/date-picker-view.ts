import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { DatePickerView as DatePickerViewValue } from './date-picker.types'
import { datePickerAnatomy } from './date-picker.anatomy'
import { ARK_DATE_PICKER_VIEW_CONTEXT, injectArkDatePickerContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerView]',
  standalone: true,
  exportAs: 'arkDatePickerView',
  providers: [
    {
      provide: ARK_DATE_PICKER_VIEW_CONTEXT,
      useFactory: (view: ArkDatePickerView) => view.getViewContext(),
      deps: [forwardRef(() => ArkDatePickerView)],
    },
  ],
})
export class ArkDatePickerView {
  /** The calendar view rendered by this container. */
  readonly view: InputSignal<DatePickerViewValue> = input.required<DatePickerViewValue>()

  private readonly viewContext = computed(() => ({ view: this.view() }))

  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({
        ...datePickerAnatomy.build().view.attrs,
        ...context.api().getViewProps(this.viewContext()),
        hidden: context.api().view !== this.view(),
      }),
    })
  }

  /** @internal Exposed for view-scoped date picker directives. */
  getViewContext(): typeof this.viewContext {
    return this.viewContext
  }
}
