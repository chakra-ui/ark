import { DestroyRef, Directive, ElementRef, Renderer2, computed, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'
import { injectArkComboboxContext } from './use-combobox-context'

@Directive({
  selector: '[arkComboboxInput]',
  standalone: true,
  exportAs: 'arkComboboxInput',
})
export class ArkComboboxInput {
  constructor() {
    const context = injectArkComboboxContext()
    const field = injectArkFieldContextOptional()
    const elementRef = inject(ElementRef)
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)
    const inputValue = computed(() => context.api().inputValue)
    let composing = false
    let upstreamCompositionStart: unknown
    let upstreamCompositionEnd: unknown
    const onCompositionStart = (event: Event) => {
      composing = true
      if (typeof upstreamCompositionStart === 'function') {
        ;(upstreamCompositionStart as (event: Event) => void)(event)
      }
    }
    const onCompositionEnd = (event: Event) => {
      composing = false
      if (typeof upstreamCompositionEnd === 'function') {
        ;(upstreamCompositionEnd as (event: Event) => void)(event)
      }
    }

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => {
        const props = context.api().getInputProps() as Record<string, unknown>
        const { defaultValue: _defaultValue, ...rest } = props
        const describedBy = field?.ariaDescribedby()
        if (describedBy) {
          rest['aria-describedby'] = describedBy
        }
        upstreamCompositionStart = rest['onCompositionStart']
        upstreamCompositionEnd = rest['onCompositionEnd']
        rest['onCompositionStart'] = onCompositionStart
        rest['onCompositionEnd'] = onCompositionEnd
        return rest
      },
    })

    effect(() => {
      const el = elementRef.nativeElement as HTMLInputElement | null
      if (!el || composing) return
      const next = inputValue()
      if (el.value !== next) el.value = next
    })
  }
}
