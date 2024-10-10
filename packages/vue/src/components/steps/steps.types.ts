import type * as steps from '@zag-js/steps'

export interface RootProps {
  /**
   * The total number of steps
   */
  count?: number
  /**
   * The initial value of the step
   */
  defaultStep?: number
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The custom ids for the stepper elements
   */
  ids?: steps.ElementIds
  /**
   * If `true`, the stepper requires the user to complete the steps in order
   */
  linear?: boolean
  /**
   * The v-model value of the step
   */
  modelValue?: number
  /**
   * The orientation of the stepper
   */
  orientation?: 'horizontal' | 'vertical'
}

export type RootEmits = {
  /**
   * Callback to be called when the value changes
   */
  stepChange: [details: steps.StepChangeDetails]
  /**
   * Callback to be called when a step is completed
   */
  stepComplete: []
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: number]
}
