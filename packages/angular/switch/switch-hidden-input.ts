import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'
import { injectArkSwitchContext } from './use-switch-context'

@Directive({
  selector: 'input[arkSwitchHiddenInput]',
  standalone: true,
  exportAs: 'arkSwitchHiddenInput',
})
export class ArkSwitchHiddenInput {
  constructor() {
    const context = injectArkSwitchContext()
    const field = injectArkFieldContextOptional()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const props = context.api().getHiddenInputProps() as Record<string, unknown>
        const describedBy = field?.ariaDescribedby()
        if (describedBy) return { ...props, 'aria-describedby': describedBy }
        return props
      },
    })
  }
}
