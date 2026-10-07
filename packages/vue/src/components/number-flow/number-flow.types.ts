import type * as numberFlow from '@zag-js/number-flow'

export interface RootProps {
  /**
   * The locale to use when formatting the number.
   */
  locale?: string
  /**
   * The ids of the elements in the number-flow. Useful for composition.
   */
  ids?: numberFlow.ElementIds | undefined
  /**
   * The v-model value of the number flow
   */
  modelValue?: number | undefined
  /**
   * The initial value to render when uncontrolled.
   * @default 0
   */
  defaultValue?: number | undefined
  /**
   * The options to pass to the `Intl.NumberFormat` constructor.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
   */
  formatOptions?: Intl.NumberFormatOptions | undefined
  /**
   * A static string rendered before the formatted value. Does not animate.
   */
  prefix?: string | undefined
  /**
   * A static string rendered after the formatted value. Does not animate.
   */
  suffix?: string | undefined
  /**
   * Controls the roll direction of each digit.
   * - `false` (default): each digit takes its own shortest path (`9 -> 0` rolls forward one step).
   * - `true`: every digit rolls in the direction of the overall value change.
   * - `1` / `-1`: force every digit to roll up or down, regardless of the value change.
   * @default false
   */
  trend?: numberFlow.Trend | undefined
  /**
   * Whether digits spin through every intermediate value instead of taking the nearest path.
   * @default false
   */
  continuous?: boolean | undefined
  /**
   * The timing of the per-digit roll transition.
   * @default { duration: "900ms", easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
   */
  spinTiming?: numberFlow.TimingOptions | undefined
  /**
   * The timing of layout transitions - segments entering/exiting.
   * @default { duration: "500ms", easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
   */
  transformTiming?: numberFlow.TimingOptions | undefined
  /**
   * A CSS `<time>` delay applied between adjacent digits, e.g. `"25ms"`.
   * @default undefined
   */
  stagger?: string | undefined
  /**
   * Whether to suppress the roll animation when the user prefers reduced motion.
   * @default true
   */
  respectMotionPreference?: boolean | undefined
  /**
   * Whether the value is announced to assistive technology as it changes.
   * When `false`, the rendered value is still readable, but changes are not announced.
   * @default false
   */
  live?: boolean | undefined
  /**
   * The unique identifier of the machine.
   */
  id?: string
}

export type RootEmits = {
  /**
   * Callback fired when the value changes.
   */
  valueChange: [details: numberFlow.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: number]
  /**
   * Callback fired when a value change starts a roll animation.
   */
  animationStart: [details: numberFlow.AnimationDetails]
  /**
   * Callback fired when the roll animation settles.
   */
  animationComplete: [details: numberFlow.AnimationDetails]
}
