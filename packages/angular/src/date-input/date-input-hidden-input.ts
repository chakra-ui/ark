import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'
import { injectArkDateInputContext } from './use-date-input-context'

@Directive({
  selector: '[arkDateInputHiddenInput]',
  standalone: true,
  exportAs: 'arkDateInputHiddenInput',
})
export class ArkDateInputHiddenInput {
  /** The range index for the hidden input. */
  readonly index: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The submitted field name. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)

  constructor() {
    const context = injectArkDateInputContext()
    const field = injectArkFieldContextOptional()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({
        'aria-describedby': field?.ariaDescribedby(),
        ...context.api().getHiddenInputProps({ index: this.index(), name: this.name() }),
      }),
    })
  }
}
