import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPinInputContext } from './use-pin-input-context'

@Directive({
  selector: '[arkPinInputHiddenInput]',
  standalone: true,
  exportAs: 'arkPinInputHiddenInput',
})
export class ArkPinInputHiddenInput {
  constructor() {
    const context = injectArkPinInputContext()
    const elementRef = inject(ElementRef)
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => {
        const props = context.api().getHiddenInputProps() as Record<string, unknown>
        const { defaultValue: _defaultValue, ...rest } = props
        return rest
      },
    })

    effect(() => {
      const el = elementRef.nativeElement as HTMLInputElement | null
      if (!el) return
      const next = context.api().valueAsString
      if (el.value !== next) el.value = next
    })
  }
}
