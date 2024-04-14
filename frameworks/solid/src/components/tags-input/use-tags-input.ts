import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as tagsInput from '@zag-js/tags-input'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTagsInputProps extends Optional<tagsInput.Context, 'id'> {}
export interface UseTagsInputReturn extends Accessor<tagsInput.Api<PropTypes>> {}

export const useTagsInput = (props: UseTagsInputProps): UseTagsInputReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(tagsInput.machine(context), { context })

  return createMemo(() => tagsInput.connect(state, send, normalizeProps))
}
