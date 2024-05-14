import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseCheckboxProps
  extends Optional<Omit<checkbox.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The checked state of the checkbox when it is first rendered.
   * Use this when you do not need to control the state of the checkbox.
   */
  defaultChecked?: checkbox.Context['checked']
}
export interface UseCheckboxReturn extends Accessor<checkbox.Api<PropTypes>> {}

export const useCheckbox = (props: UseCheckboxProps): UseCheckboxReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    checked: props.defaultChecked,
    ...props,
  }))

  const [state, send] = useMachine(checkbox.machine(context()), { context })

  return createMemo(() => checkbox.connect(state, send, normalizeProps))
}
