import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectColorPickerChannelSliderProps } from './color-picker-part-context'
import { injectArkColorPickerContext } from './use-color-picker-context'

@Directive({
  selector: '[arkColorPickerChannelSliderThumb]',
  standalone: true,
  exportAs: 'arkColorPickerChannelSliderThumb',
})
export class ArkColorPickerChannelSliderThumb {
  constructor() {
    const context = injectArkColorPickerContext()
    const sliderProps = injectColorPickerChannelSliderProps()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getChannelSliderThumbProps(sliderProps()),
    })
  }
}
