import type * as steps from '@zag-js/steps'

export interface RootProps {
  /**
   * The number of steps in the component.
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
   * The ids of the elements. Useful for composition.
   */
  ids?: Partial<{
    root: string
    list: string
    progress: string
    trigger(index: number): string
    separator(index: number): string
    item(index: number): string
    itemContent(index: number): string
  }>
  /**
   * Whether the step transitions should be linear and require the user
   * to go through each step one by one.
   *
   * @default false
   */
  linear?: boolean
  /**
   * The orientation of the steps.
   *
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The controlled step of the component.
   */
  step?: number
}

export type RootEmits = {
  /**
   * Event triggered when a step is changed, either by clicking on a step,
   * clicking on the next/previous triggers, or by calling `setStep`.
   */
  stepChange: [details: steps.StepChangeDetails]
  /**
   * Event triggered when a step is completed by clicking on the next/previous
   * triggers or by calling `setStep`.
   */
  stepComplete: []
  /**
   * Event triggered when the model value changes.
   */
  'update:modelValue': [value: number]
}
