import { normalizeProps, useMachine } from '@zag-js/react'
import * as tagsInput from '@zag-js/tags-input'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseTagsInputProps = Optional<tagsInput.Context, 'id'> & {
  defaultValue?: tagsInput.Context['value']
}
export type UseTagsInputReturn = tagsInput.Api

export const useTagsInput = (props: UseTagsInputProps): UseTagsInputReturn => {
  const getRootNode = useEnvironmentContext()
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.value ?? props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(tagsInput.machine(initialContext), { context })
  return tagsInput.connect(state, send, normalizeProps)
}
