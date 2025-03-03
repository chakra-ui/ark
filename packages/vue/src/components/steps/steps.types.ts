import type * as steps from '@zag-js/steps'

export interface RootProps {
  /**
   * The total number of steps
   */
  count?: number
  /**
   * The initial value of the stepper when rendered.
   * Use when you don't need to control the value of the stepper.
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
   * The orientation of the stepper
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The controlled value of the stepper
   */
  step?: number
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
  'update:step': [step: number]
}
