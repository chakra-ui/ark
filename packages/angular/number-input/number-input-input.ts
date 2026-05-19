import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkNumberInputContext } from './use-number-input-context'

@Directive({
  selector: '[arkNumberInputInput]',
  standalone: true,
  exportAs: 'arkNumberInputInput',
})
export class ArkNumberInputInput {
  constructor() {
    const context = injectArkNumberInputContext()
    const elementRef = inject(ElementRef)
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => {
        const props = context.api().getInputProps() as Record<string, unknown>
        const { defaultValue: _defaultValue, ...rest } = props
        return rest
      },
    })
  }
}
