import { normalizeProps, useMachine } from '@zag-js/solid'
import * as tagsInput from '@zag-js/tags-input'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseTagsInputProps = Optional<tagsInput.Context, 'id'> & {
  defaultValue?: tagsInput.Context['value']
}
export type UseTagsInputReturn = ReturnType<typeof useTagsInput>

export const useTagsInput = (props: UseTagsInputProps) => {
  const initialContext = mergeProps({ id: createUniqueId(), value: props.defaultValue }, props)
  const context = mergeProps(initialContext, { value: props.value })

  const [state, send] = useMachine(tagsInput.machine(initialContext), { context })
  return createMemo(() => tagsInput.connect(state, send, normalizeProps))
}
