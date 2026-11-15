import type * as slider from '@zag-js/slider'

export interface RootProps {
  /**
   * The initial value of the slider when rendered.
   * Use when you don't need to control the value of the slider.
   */
  defaultValue?: number[]
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean
  /**
   * The associate form of the underlying input element.
   */
  form?: string
  /**
   * Function that returns the accessible name of each thumb, e.g. "Minimum price"
   */
  getAriaLabel?: (details: slider.ThumbLabelDetails) => string
  /**
   * Function that returns the `id` of the element that labels each thumb.
   * Defaults to the label part when no `getAriaLabel` is provided.
   */
  getAriaLabelledBy?: (details: slider.ThumbLabelDetails) => string
  /**
   * Function that returns a human readable value for the slider thumb
   */
  getAriaValueText?: (details: slider.ValueTextDetails) => string
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Document | Node
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the slider. Useful for composition.
   */
  ids?: slider.ElementIds
  /**
   * Whether the slider is invalid
   */
  invalid?: boolean
  /**
   * The step value of the slider when the `Shift` key is held, or the
   * `PageUp`/`PageDown` keys are used.
   * @default 10 * step
   */
  largeStep?: number
  /**
   * The maximum value of the slider
   * @default 100
   */
  max?: number
  /**
   * The minimum value of the slider
   * @default 0
   */
  min?: number
  /**
   * The minimum permitted steps between multiple thumbs.
   *
   * `minStepsBetweenThumbs` * `step` should reflect the gap between the thumbs.
   *
   * - `step: 1` and `minStepsBetweenThumbs: 10` => gap is `10`
   * - `step: 10` and `minStepsBetweenThumbs: 2` => gap is `20`
   *
   * @default 0
   */
  minStepsBetweenThumbs?: number
  /**
   * The v-model value of the slider
   */
  modelValue?: number[]
  /**
   * The name associated with each slider thumb (when used in a form)
   */
  name?: string
  /**
   * The orientation of the slider
   * @default "horizontal"
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * The origin of the slider range. The track is filled from the origin to the thumb.
   * - `"start"` / `"end"`: fill from `min` / `max`
   * - `"center"`: fill from the midpoint of `min`/`max`
   * - a `number`: fill from that value instead, for when the neutral point isn't the midpoint
   *
   * @default "start"
   */
  origin?: slider.SliderOrigin
  /**
   * Whether the slider is read-only
   */
  readOnly?: boolean
  /**
   * The step value of the slider
   * @default 1
   */
  step?: number
  /**
   * The alignment of the slider thumb relative to the track
   * - `center`: the thumb will extend beyond the bounds of the slider track.
   * - `contain`: the thumb will be contained within the bounds of the track.
   *
   * @default "contain"
   */
  thumbAlignment?: 'center' | 'contain'
  /**
   * Controls how thumbs behave when they collide during pointer interactions.
   * - `none` (default): Thumbs cannot move past each other; excess movement is ignored.
   * - `push`: Thumbs push each other without restoring their previous positions when dragged back.
   * - `swap`: Thumbs swap places when dragged past each other.
   *
   * @default "none"
   */
  thumbCollisionBehavior?: 'none' | 'push' | 'swap'
  /**
   * The slider thumbs dimensions. A number sets both the width and height.
   */
  thumbSize?: number | { width: number; height: number }
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
