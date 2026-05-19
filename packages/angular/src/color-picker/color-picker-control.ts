import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerControl]',
  standalone: true,
  exportAs: 'arkColorPickerControl',
})
export class ArkColorPickerControl {
  constructor() {
    const context = injectArkColorPickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getControlProps(),
    })
  }
}
