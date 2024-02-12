import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import * as tagsInput from '@zag-js/tags-input'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseTagsInputProps extends Optional<tagsInput.Context, 'id'> {}
export interface UseTagsInputReturn extends Accessor<tagsInput.Api<PropTypes>> {}

export const useTagsInput = (props: UseTagsInputProps): UseTagsInputReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(tagsInput.machine(context), { context })

  return createMemo(() => tagsInput.connect(state, send, normalizeProps))
}
