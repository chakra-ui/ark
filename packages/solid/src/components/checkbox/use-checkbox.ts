import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { useFieldContext } from '../field/index.tsx'
import { useCheckboxGroupContext } from './use-checkbox-group-context.tsx'

export interface UseCheckboxProps extends Optional<Omit<checkbox.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseCheckboxReturn extends Accessor<checkbox.Api<PropTypes>> {}

export const useCheckbox = (ownProps: MaybeAccessor<UseCheckboxProps> = {}): UseCheckboxReturn => {
  const checkboxGroup = useCheckboxGroupContext()

  const props = createMemo(() => {
    const resolvedProps = runIfFn(ownProps)
    return mergeProps(checkboxGroup?.().getItemProps({ value: resolvedProps.value }) ?? {}, resolvedProps)
  }, [ownProps, checkboxGroup])

  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = createMemo(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      hiddenInput: field?.().ids.control,
    },
    disabled: field?.().disabled,
    readOnly: field?.().readOnly,
    invalid: field?.().invalid,
    required: field?.().required,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props(),
  }))

  const service = useMachine(checkbox.machine, machineProps)
  return createMemo(() => checkbox.connect(service, normalizeProps))
}
