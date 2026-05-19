import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_PASSWORD_INPUT_VALUE_WRITER, injectArkPasswordInputContext } from './use-password-input-context'
import { ArkPasswordInputRoot } from './password-input-root'

@Directive({
  selector: '[arkPasswordInputInput]',
  standalone: true,
  exportAs: 'arkPasswordInputInput',
})
export class ArkPasswordInputInput {
  constructor() {
    const context = injectArkPasswordInputContext()
    const writer = inject(ARK_PASSWORD_INPUT_VALUE_WRITER, { optional: true })
    const root = inject(ArkPasswordInputRoot, { optional: true })
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
        if (writer) {
          rest['onInput'] = (event: Event) => {
            if (typeof onChange === 'function') {
              ;(onChange as (event: Event) => void)(event)
            }
            const target = event.target as HTMLInputElement | null
            if (!target) return
            writer.setValue(target.value)
          }
        }
        if (root) {
          const upstreamOnBlur = rest['onBlur']
          rest['onBlur'] = (event: Event) => {
            try {
              if (typeof upstreamOnBlur === 'function') {
                ;(upstreamOnBlur as (event: Event) => void)(event)
              }
            } finally {
              root.markTouched()
            }
          }
        }
        return rest
      },
    })
  }
}
