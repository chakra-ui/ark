import type * as steps from '@zag-js/steps'

export interface RootProps {
  /**
   * The controlled completed step values
   */
  completedValues?: string[]
  /**
   * The initial completed step values when rendered.
   * Use when you don't need to control the completed steps.
   */
  defaultCompletedValues?: string[]
  /**
   * The initial value of the stepper when rendered.
   * Use when you don't need to control the value of the stepper.
   */
  defaultValue?: string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The custom ids for the stepper elements
   */
  ids?: steps.ElementIds
  /**
   * The steps, in order. Each step has a unique `value`.
   */
  items: steps.StepItem[]
  /**
   * If `true`, the stepper requires the user to complete the steps in order
   */
  linear?: boolean
  /**
   * The v-model value of the stepper
   */
  modelValue?: string | null
  /**
   * The orientation of the stepper
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The localized messages to use.
   */
  translations?: steps.IntlTranslations
}

export type RootEmits = {
  /**
   * Callback to be called when the completed steps change
   */
  completedChange: [details: steps.CompletedChangeDetails]
  /**
   * Callback to be called when the last step is completed
   */
  complete: [details: steps.CompleteDetails]
  /**
   * Callback to be called when navigation to a step is blocked
   */
  navigationBlocked: [details: steps.NavigationBlockedDetails]
  /**
   * Callback to be called when the value changes
   */
  valueChange: [details: steps.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string | null]
}
