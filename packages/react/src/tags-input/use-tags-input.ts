import { normalizeProps, useMachine } from '@zag-js/react'
import * as tagsInput from '@zag-js/tags-input'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseTagsInputProps = Omit<tagsInput.Context, 'id'> & {
  defaultValue?: tagsInput.Context['value']
}

export const useTagsInput = (props: UseTagsInputProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
    value: props.value ?? props.defaultValue,
  })

  const [state, send] = useMachine(tagsInput.machine(initialContext))
  return tagsInput.connect(state, send, normalizeProps)
}

export type UseTagsInputReturn = ReturnType<typeof useTagsInput>
