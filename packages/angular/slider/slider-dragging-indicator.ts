import { DestroyRef, Directive, ElementRef, Renderer2, computed, inject, type Signal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSliderContext } from './use-slider-context'
import { injectArkSliderThumbPropsContext } from './use-slider-thumb-props-context'

@Directive({
  selector: '[arkSliderDraggingIndicator]',
  standalone: true,
  exportAs: 'arkSliderDraggingIndicator',
})
export class ArkSliderDraggingIndicator {
  private readonly context = injectArkSliderContext()
  private readonly thumb = injectArkSliderThumbPropsContext()
  readonly value: Signal<number | undefined> = computed(() => {
    const api = this.context.api()
    const index = this.thumb.thumbProps().index
    if (api.value[index] === undefined) return undefined
    return api.getThumbValue(index)
  })

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const api = this.context.api()
        const index = this.thumb.thumbProps().index
        if (api.value[index] === undefined) return {}
        return api.getDraggingIndicatorProps({ index })
      },
    })
  }
}
