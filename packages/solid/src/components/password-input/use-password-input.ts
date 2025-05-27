import * as passwordInput from '@zag-js/password-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
import { useFieldContext } from '../field'

export interface UsePasswordInputProps extends Optional<Omit<passwordInput.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePasswordInputReturn extends Accessor<passwordInput.Api<PropTypes>> {}

export const usePasswordInput = (props?: MaybeAccessor<UsePasswordInputProps>): UsePasswordInputReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = createMemo<passwordInput.Props>(() => ({
    id,
    ids: {
      input: field?.().ids.control,
    },
    disabled: field?.().disabled,
    readOnly: field?.().readOnly,
    required: field?.().required,
    invalid: field?.().invalid,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(passwordInput.machine, machineProps)
  return createMemo(() => passwordInput.connect(service, normalizeProps))
}
