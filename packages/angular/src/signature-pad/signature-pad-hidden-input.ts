import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContextOptional } from '../../field/use-field-context'
import { injectArkSignaturePadContext } from './use-signature-pad-context'

@Directive({
  selector: '[arkSignaturePadHiddenInput]',
  standalone: true,
  exportAs: 'arkSignaturePadHiddenInput',
})
export class ArkSignaturePadHiddenInput {
  /** The serialized value submitted with the form. */
  readonly value: InputSignal<string> = input<string>('')

  constructor() {
    const context = injectArkSignaturePadContext()
    const field = injectArkFieldContextOptional()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({
        'aria-describedby': field?.ariaDescribedby(),
        ...context.api().getHiddenInputProps({ value: this.value() }),
      }),
    })
  }
}
