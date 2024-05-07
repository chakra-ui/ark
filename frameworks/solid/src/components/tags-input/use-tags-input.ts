import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as tagsInput from '@zag-js/tags-input'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTagsInputProps
  extends Optional<Omit<tagsInput.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTagsInputReturn extends Accessor<tagsInput.Api<PropTypes>> {}

export const useTagsInput = (props: UseTagsInputProps): UseTagsInputReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const context = createMemo(() => ({
    id: createUniqueId(),
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))
  const [state, send] = useMachine(tagsInput.machine(context()), { context })

  return createMemo(() => tagsInput.connect(state, send, normalizeProps))
}
