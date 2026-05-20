import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  numberAttribute,
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { SliderThumbProps } from './slider.types'
import { injectArkSliderContext } from './use-slider-context'
import { ARK_SLIDER_THUMB_PROPS_CONTEXT, type SliderThumbPropsContext } from './use-slider-thumb-props-context'

@Directive({
  selector: '[arkSliderThumb]',
  standalone: true,
  exportAs: 'arkSliderThumb',
  providers: [{ provide: ARK_SLIDER_THUMB_PROPS_CONTEXT, useExisting: forwardRef(() => ArkSliderThumb) }],
})
export class ArkSliderThumb implements SliderThumbPropsContext {
  /** The zero-based index of the thumb. */
  readonly index: InputSignalWithTransform<number, unknown> = input.required<number, unknown>({
    transform: numberAttribute,
  })
  /** The form name for this thumb. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  readonly thumbProps: Signal<SliderThumbProps> = computed(() => ({
    index: this.index(),
    name: this.name(),
  }))

  constructor() {
    const context = injectArkSliderContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const api = context.api()
        if (api.value[this.index()] === undefined) return {}
        return api.getThumbProps(this.thumbProps())
      },
    })
  }
}
