import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectColorPickerAreaProps } from './color-picker-part-context'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerAreaBackground]',
  standalone: true,
  exportAs: 'arkColorPickerAreaBackground',
})
export class ArkColorPickerAreaBackground {
  constructor() {
    const context = injectArkColorPickerContext()
    const areaProps = injectColorPickerAreaProps()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getAreaBackgroundProps(areaProps()),
    })
  }
}
