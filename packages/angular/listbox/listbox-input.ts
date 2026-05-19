import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkListboxContext } from './use-listbox-context'

@Directive({
  selector: '[arkListboxInput]',
  standalone: true,
  exportAs: 'arkListboxInput',
})
export class ArkListboxInput {
  /** Whether to automatically highlight the item when typing. */
  readonly autoHighlight: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    {
      transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)),
    },
  )
  /** Determines how keyboard conflicts in the input are resolved. */
  readonly keyboardPriority: InputSignal<'caret' | 'navigate' | undefined> = input<'caret' | 'navigate' | undefined>(
    undefined,
  )

  constructor() {
    const context = injectArkListboxContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getInputProps({
          autoHighlight: this.autoHighlight(),
          keyboardPriority: this.keyboardPriority(),
        }),
    })
  }
}
