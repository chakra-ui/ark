import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerTransparencyGrid]',
  standalone: true,
  exportAs: 'arkColorPickerTransparencyGrid',
})
export class ArkColorPickerTransparencyGrid {
  /** The checkerboard cell size. */
  readonly size: InputSignal<string | undefined> = input<string | undefined>(undefined)

  constructor() {
    const context = injectArkColorPickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTransparencyGridProps({ size: this.size() }),
    })
  }
}
