import { isPlatformBrowser } from '@angular/common'
import {
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  Renderer2,
  booleanAttribute,
  effect,
  inject,
  input,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { autoresizeTextarea } from '@zag-js/auto-resize'
import { injectArkFieldContext } from './use-field-context'

@Directive({
  selector: '[arkFieldTextarea]',
  standalone: true,
  exportAs: 'arkFieldTextarea',
})
export class ArkFieldTextarea {
  /** Whether the textarea should autoresize. */
  readonly autoresize: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  constructor() {
    const context = injectArkFieldContext()
    const elementRef = inject<ElementRef<HTMLTextAreaElement>>(ElementRef)
    const destroyRef = inject(DestroyRef)
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

    applyArkProps({
      elementRef,
      renderer: inject(Renderer2),
      destroyRef,
      props: () => ({
        ...context.getTextareaProps(),
        style: this.autoresize() ? { resize: 'none' } : undefined,
      }),
    })

    if (!isBrowser) return

    effect((onCleanup) => {
      if (!this.autoresize()) return

      const cleanup = autoresizeTextarea(elementRef.nativeElement)
      onCleanup(() => {
        cleanup?.()
      })
    })
  }
}
