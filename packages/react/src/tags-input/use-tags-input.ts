import { normalizeProps, useMachine } from '@zag-js/react'
import * as tagsInput from '@zag-js/tags-input'
import { useId } from 'react'
import type { OptionalId } from '../types'

export type UseTagsInputProps = OptionalId<tagsInput.Context> & {
  defaultValue?: tagsInput.Context['value']
}

export const useTagsInput = (props: UseTagsInputProps) => {
  const initialContext = {
    id: useId(),
    ...props,
    value: props.value ?? props.defaultValue,
    // value: props.defaultValue, // FIXME: skip value assignment
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(
    tagsInput.machine(initialContext),
    // { context } // FIXME: callstack exceeded
  )
  return tagsInput.connect(state, send, normalizeProps)
}

export type UseTagsInputReturn = ReturnType<typeof useTagsInput>
