import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContext } from './use-field-context'

@Directive({
  selector: '[arkFieldErrorText]',
  standalone: true,
  exportAs: 'arkFieldErrorText',
})
export class ArkFieldErrorText {
  constructor() {
    const context = injectArkFieldContext()

    effect((onCleanup) => {
      onCleanup(context.registerErrorText())
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.getErrorTextProps(),
    })
  }
}
