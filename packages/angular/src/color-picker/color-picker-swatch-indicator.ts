import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectColorPickerSwatchProps } from './color-picker-part-context'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerSwatchIndicator]',
  standalone: true,
  exportAs: 'arkColorPickerSwatchIndicator',
})
export class ArkColorPickerSwatchIndicator {
  constructor() {
    const context = injectArkColorPickerContext()
    const swatchProps = injectColorPickerSwatchProps()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getSwatchIndicatorProps(swatchProps()),
    })
  }
}
