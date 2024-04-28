import type * as slider from '@zag-js/slider'

export interface RootProps {
  /**
   * The aria-label of each slider thumb. Useful for providing an accessible name to the slider
   */
  'aria-label'?: string[]
  /**
   * The `id` of the elements that labels each slider thumb. Useful for providing an accessible name to the slider
   */
  'aria-labelledby'?: string[]
  /**
   * The initial value of the slider when it is first rendered.
   * Use when you do not need to control the state of the slider.
   */
  defaultValue?: number[]
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean
  /**
   * The associate form of the underlying input element.
   */
  form?: string
  /**
   * Function that returns a human readable value for the slider thumb
   */
  // @ts-expect-error
  getAriaValueText?: (details: ValueTextDetails) => string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the range slider. Useful for composition.
   */
  ids?: Partial<{
    root: string
    thumb(index: number): string
    control: string
    track: string
    range: string
    label: string
    valueText: string
    marker(index: number): string
  }>
  /**
   * Whether the slider is invalid
   */
  invalid?: boolean
  /**
   * The maximum value of the slider
   */
  max?: number
  /**
   * The minimum value of the slider
   */
  min?: number
  /**
   * The minimum permitted steps between multiple thumbs.
   */
  minStepsBetweenThumbs?: number
  modelValue?: number[]
  /**
   * The name associated with each slider thumb (when used in a form)
   */
  name?: string
  /**
   * The orientation of the slider
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * - "start": Useful when the value represents an absolute value
   * - "center": Useful when the value represents an offset (relative)
   */
  origin?: 'start' | 'center'
  /**
   * Whether the slider is read-only
   */
  readOnly?: boolean
  /**
   * The step value of the slider
   */
  step?: number
  /**
   * The alignment of the slider thumb relative to the track
   * - `center`: the thumb will extend beyond the bounds of the slider track.
   * - `contain`: the thumb will be contained within the bounds of the track.
   */
  thumbAlignment?: 'center' | 'contain'
  /**
   * The slider thumbs dimensions
   */
  thumbSize?: { width: number; height: number }
}

export type RootEmits = {
  /**
   * Function invoked when the slider's focused index changes
   */
  focusChange: [details: slider.FocusChangeDetails]
  /**
   * Function invoked when the value of the slider changes
   */
  valueChange: [details: slider.ValueChangeDetails]
  /**
   * Function invoked when the slider value change is done
   */
  valueChangeEnd: [details: slider.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: number[]]
}
