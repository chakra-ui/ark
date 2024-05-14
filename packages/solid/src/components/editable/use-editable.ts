import * as editable from '@zag-js/editable'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseEditableProps
  extends Optional<Omit<editable.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the editable when it is first rendered.
   * Use when you do not need to control the state of the editable.
   */
  defaultValue?: editable.Context['value']
}
export interface UseEditableReturn extends Accessor<editable.Api<PropTypes>> {}

export const useEditable = (props: UseEditableProps) => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    value: props.defaultValue,
    ...props,
  }))
  const [state, send] = useMachine(editable.machine(context()), { context })

  return createMemo(() => editable.connect(state, send, normalizeProps))
}
