import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: 'select[arkColorPickerFormatSelect]',
  standalone: true,
  exportAs: 'arkColorPickerFormatSelect',
})
export class ArkColorPickerFormatSelect {
  constructor() {
    const context = injectArkColorPickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getFormatSelectProps(),
    })
  }
}
