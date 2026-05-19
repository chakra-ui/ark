import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDatePickerContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerLabel]',
  standalone: true,
  exportAs: 'arkDatePickerLabel',
})
export class ArkDatePickerLabel {
  /** The index of the input this label is associated with. */
  readonly index: InputSignal<number | undefined> = input<number | undefined>(undefined)

  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getLabelProps({ index: this.index() }),
    })
  }
}
