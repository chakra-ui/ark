import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { createId } from '$lib/utils/create-id'
import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'

export interface UseCheckboxProps
  extends Optional<Omit<checkbox.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The checked value of the slider when it is first rendered.
   * Use when you do not need to control the state of the checkbox.
   */
  defaultChecked?: checkbox.Context['checked']
}
export interface UseCheckboxReturn extends Accessor<checkbox.Api<PropTypes>> {}

export const useCheckbox = (props: UseCheckboxProps = {}) => {
  const id = createId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const initialContext: checkbox.Context = $derived({
    id,
    dir: locale.dir,
    getRootNode: env.getRootNode,
    checked: props.defaultChecked,
    ...props,
  })

  const context: checkbox.Context = $derived({
    ...initialContext,
    checked: props.checked,
  })

  const [state, send] = useMachine(checkbox.machine(initialContext), { context })
  const api = $derived(() => checkbox.connect(state, send, normalizeProps))
  return api
}
