import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkEditableContext } from './use-editable-context'

@Directive({
  selector: '[arkEditableInput]',
  standalone: true,
  exportAs: 'arkEditableInput',
})
export class ArkEditableInput {
  constructor() {
    const context = injectArkEditableContext()
    const elementRef = inject(ElementRef)
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => {
        const props = context.api().getInputProps() as Record<string, unknown>
        const { onChange, defaultValue: _defaultValue, ...rest } = props
        if (typeof onChange === 'function') {
          rest['onInput'] = onChange
        }
        return rest
      },
    })

    effect(() => {
      const el = elementRef.nativeElement as HTMLInputElement | HTMLTextAreaElement | null
      if (!el) return
      const next = context.api().value
      if (el.value !== next) el.value = next
    })
  }
}
