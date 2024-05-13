import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as toggleGroup from '@zag-js/toggle-group'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseToggleGroupProps
  extends Optional<Omit<toggleGroup.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the toggle group when it is first rendered.
   * Use when you do not need to control the state of the toggle group.
   */
  defaultValue?: toggleGroup.Context['value']
}
export interface UseToggleGroupReturn extends Accessor<toggleGroup.Api<PropTypes>> {}

export const useToggleGroup = (props: UseToggleGroupProps): UseToggleGroupReturn => {
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
  const [state, send] = useMachine(toggleGroup.machine(context()), {
    context,
  })

  return createMemo(() => toggleGroup.connect(state, send, normalizeProps))
}
