import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useFieldContext } from '../field'
import { useCheckboxGroupContext } from './use-checkbox-group-context'

export interface UseCheckboxProps
  extends Optional<Omit<checkbox.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The checked state of the checkbox when it is first rendered.
   * Use this when you do not need to control the state of the checkbox.
   */
  defaultChecked?: checkbox.Context['checked']
}
export interface UseCheckboxReturn extends Accessor<checkbox.Api<PropTypes>> {}

export const useCheckbox = (ownProps: UseCheckboxProps): UseCheckboxReturn => {
  const checkboxGroup = useCheckboxGroupContext()

  const props = createMemo(() => {
    return mergeProps(ownProps, checkboxGroup?.().getItemProps({ value: ownProps.value }) ?? {})
  }, [ownProps, checkboxGroup])

  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()
  const field = useFieldContext()

  const context = createMemo(() => ({
    id,
    ids: {
      label: field?.ids.label,
      hiddenInput: field?.ids.control,
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    invalid: field?.invalid,
    required: field?.required,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    checked: props().defaultChecked,
    ...props(),
  }))

  const [state, send] = useMachine(checkbox.machine(context()), { context })

  return createMemo(() => checkbox.connect(state, send, normalizeProps))
}
