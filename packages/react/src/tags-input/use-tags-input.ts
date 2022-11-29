import { normalizeProps, useMachine } from '@zag-js/react'
import * as tagsInput from '@zag-js/tags-input'
import { useId } from 'react'
import type { Optional } from '../types'

export type UseTagsInputProps = Optional<tagsInput.Context, 'id'> & {
  defaultValue?: tagsInput.Context['value']
}

export const useTagsInput = (props: UseTagsInputProps) => {
  const initialContext = {
    id: useId(),
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

export type UseTagsInputReturn = ReturnType<typeof useTagsInput>
