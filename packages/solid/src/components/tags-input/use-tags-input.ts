import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as tagsInput from '@zag-js/tags-input'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useFieldContext } from '../field'

export interface UseTagsInputProps
  extends Optional<Omit<tagsInput.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the tags input when it is first rendered.
   * Use when you do not need to control the state of the tags input.
   */
  defaultValue?: tagsInput.Context['value']
}
export interface UseTagsInputReturn extends Accessor<tagsInput.Api<PropTypes>> {}

export const useTagsInput = (props: UseTagsInputProps): UseTagsInputReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()
  const field = useFieldContext()

  const context = createMemo(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      hiddenInput: field?.().ids.control,
    },
    dir: locale().dir,
    disabled: field?.().disabled,
    invalid: field?.().invalid,
    readOnly: field?.().readOnly,
    required: field?.().required,
    getRootNode: environment().getRootNode,
    value: props.defaultValue,
    ...props,
  }))
  const [state, send] = useMachine(tagsInput.machine(context()), { context })

  return createMemo(() => tagsInput.connect(state, send, normalizeProps))
}
