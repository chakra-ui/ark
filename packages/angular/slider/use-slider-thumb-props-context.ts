import { InjectionToken, type Signal, inject } from '@angular/core'
import type { SliderThumbProps } from './slider.types'

export interface SliderThumbPropsContext {
  readonly thumbProps: Signal<SliderThumbProps>
}

export const ARK_SLIDER_THUMB_PROPS_CONTEXT = new InjectionToken<SliderThumbPropsContext>(
  'ARK_SLIDER_THUMB_PROPS_CONTEXT',
)

export function injectArkSliderThumbPropsContext(): SliderThumbPropsContext {
  return inject(ARK_SLIDER_THUMB_PROPS_CONTEXT)
}
