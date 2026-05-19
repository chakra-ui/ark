import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: 'input[arkColorPickerHiddenInput]',
  standalone: true,
  exportAs: 'arkColorPickerHiddenInput',
})
export class ArkColorPickerHiddenInput {
  constructor() {
    const context = injectArkColorPickerContext()
    const field = injectArkFieldContextOptional()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({
        'aria-describedby': field?.ariaDescribedby(),
        ...context.api().getHiddenInputProps(),
      }),
    })
  }
}
