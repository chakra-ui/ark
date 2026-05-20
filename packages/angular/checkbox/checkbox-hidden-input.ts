import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'
import { injectArkCheckboxContext } from './use-checkbox-context'

type BlurHandler = (event: FocusEvent) => void
type TouchedContext = { markTouched?: () => void }

@Directive({
  selector: '[arkCheckboxHiddenInput]',
  standalone: true,
  exportAs: 'arkCheckboxHiddenInput',
})
export class ArkCheckboxHiddenInput {
  constructor() {
    const context = injectArkCheckboxContext()
    const field = injectArkFieldContextOptional()

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const props = context.api().getHiddenInputProps() as Record<string, unknown>
        const onBlur = props['onBlur'] as BlurHandler | undefined
        return {
          ...props,
          'aria-describedby': field?.ariaDescribedby(),
          onBlur: (event: FocusEvent) => {
            onBlur?.(event)
            ;(context as TouchedContext).markTouched?.()
          },
        }
      },
    })
  }
}
