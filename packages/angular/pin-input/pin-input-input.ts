import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
  numberAttribute,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_PIN_INPUT_COUNT_REGISTRAR, injectArkPinInputContext } from './use-pin-input-context'

@Directive({
  selector: '[arkPinInputInput]',
  standalone: true,
  exportAs: 'arkPinInputInput',
})
export class ArkPinInputInput {
  /** The zero-based index of this input slot. */
  readonly index: InputSignalWithTransform<number, unknown> = input.required<number, unknown>({
    transform: numberAttribute,
  })

  constructor() {
    const context = injectArkPinInputContext()
    const registrar = inject(ARK_PIN_INPUT_COUNT_REGISTRAR, { optional: true })
    const elementRef = inject(ElementRef)
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)

    if (registrar) {
      let lastIndex: number | null = null
      let dispose: (() => void) | null = null
      effect(() => {
        const i = this.index()
        if (i === lastIndex) return
        if (dispose) dispose()
        lastIndex = i
        dispose = registrar.register(i)
      })
      destroyRef.onDestroy(() => {
        if (dispose) dispose()
      })
    }

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => {
        const props = context.api().getInputProps({ index: this.index() }) as Record<string, unknown>
        const { onChange, defaultValue: _defaultValue, ...rest } = props
        if (typeof onChange === 'function') {
          rest['onInput'] = onChange
        }
        return rest
      },
    })

    effect(() => {
      const el = elementRef.nativeElement as HTMLInputElement | null
      if (!el) return
      const next = context.api().value[this.index()] ?? ''
      if (el.value !== next) el.value = next
    })
  }
}
