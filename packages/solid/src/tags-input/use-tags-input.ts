import { normalizeProps, useMachine } from '@zag-js/solid'
import * as tagsInput from '@zag-js/tags-input'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseTagsInputProps = Optional<tagsInput.Context, 'id'>
export type UseTagsInputReturn = ReturnType<typeof useTagsInput>

export const useTagsInput = (props: UseTagsInputProps) => {
  const context = mergeProps({ id: createUniqueId() }, props)
  const [state, send] = useMachine(tagsInput.machine(context), { context })

  return createMemo(() => tagsInput.connect(state, send, normalizeProps))
}
