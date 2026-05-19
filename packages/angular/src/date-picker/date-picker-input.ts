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
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDatePickerContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerInput]',
  standalone: true,
  exportAs: 'arkDatePickerInput',
})
export class ArkDatePickerInput {
  /** The index of the input to focus. */
  readonly index: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Whether to fix the input value on blur. */
  readonly fixOnBlur: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })

  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getInputProps({ index: this.index(), fixOnBlur: this.fixOnBlur() }),
    })
  }
}
