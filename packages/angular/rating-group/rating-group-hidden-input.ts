import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'
import { injectArkRatingGroupContext } from './use-rating-group-context'

@Directive({
  selector: 'input[arkRatingGroupHiddenInput]',
  standalone: true,
  exportAs: 'arkRatingGroupHiddenInput',
})
export class ArkRatingGroupHiddenInput {
  constructor() {
    const context = injectArkRatingGroupContext()
    const field = injectArkFieldContextOptional()
    const elementRef = inject(ElementRef) as ElementRef<HTMLInputElement>
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => {
        const props = context.api().getHiddenInputProps() as Record<string, unknown>
        const { defaultValue: _defaultValue, ...rest } = props
        return {
          'aria-describedby': field?.ariaDescribedby(),
          ...rest,
        }
      },
    })

    effect(() => {
      const el = elementRef.nativeElement
      const next = String(context.api().value ?? '')
      if (el.value !== next) el.value = next
    })
  }
}
