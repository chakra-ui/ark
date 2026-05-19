import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContext } from './use-field-context'

@Directive({
  selector: '[arkFieldHelperText]',
  standalone: true,
  exportAs: 'arkFieldHelperText',
})
export class ArkFieldHelperText {
  constructor() {
    const context = injectArkFieldContext()

    effect((onCleanup) => {
      onCleanup(context.registerHelperText())
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.getHelperTextProps(),
    })
  }
}
