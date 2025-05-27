import * as passwordInput from '@zag-js/password-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useFieldContext } from '../field'

export interface UsePasswordInputProps extends Optional<Omit<passwordInput.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePasswordInputReturn extends passwordInput.Api<PropTypes> {}

export const usePasswordInput = (props?: UsePasswordInputProps): UsePasswordInputReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const field = useFieldContext()

  const machineProps: passwordInput.Props = {
    id,
    ids: {
      input: field?.ids.control,
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    required: field?.required,
    invalid: field?.invalid,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(passwordInput.machine, machineProps)
  return passwordInput.connect(service, normalizeProps)
}
