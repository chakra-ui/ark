import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSliderContext } from './use-slider-context'
import { injectArkSliderThumbPropsContext } from './use-slider-thumb-props-context'

@Directive({
  selector: '[arkSliderHiddenInput]',
  standalone: true,
  exportAs: 'arkSliderHiddenInput',
})
export class ArkSliderHiddenInput {
  constructor() {
    const context = injectArkSliderContext()
    const thumb = injectArkSliderThumbPropsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const api = context.api()
        if (api.value[thumb.thumbProps().index] === undefined) return {}
        return api.getHiddenInputProps(thumb.thumbProps())
      },
    })
  }
}
