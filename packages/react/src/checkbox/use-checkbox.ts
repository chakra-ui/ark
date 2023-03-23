import * as checkbox from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useEffect, useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseCheckboxProps = Optional<checkbox.Context, 'id'> & {
  checked?: checkbox.Context['defaultChecked']
}
export type UseCheckboxReturn = ReturnType<typeof useCheckbox>

export const useCheckbox = (props: UseCheckboxProps) => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(checkbox.machine(context), { context })

  const api = checkbox.connect(state, send, normalizeProps)

  const { checked } = props
  const { isChecked } = api
  useEffect(() => {
    if (checked == undefined) {
      return
    }

    if (checked !== isChecked) {
      api.setChecked(checked)
    }
  }, [checked, isChecked, api])

  return api
}
