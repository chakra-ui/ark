import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as progress from '@zag-js/progress'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'

export interface UseProgressProps extends Omit<progress.Context, 'dir' | 'getRootNode'> {
  /**
   * The initial value of the progress when it is first rendered.
   * Use when you do not need to control the state of the progress.
   */
  defaultValue?: progress.Context['value']
}

export interface UseProgressReturn extends Accessor<progress.Api<PropTypes>> {}

export const useProgress = (props: UseProgressProps) => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const initialContext: progress.Context = $derived({
    dir: locale.dir,
    value: props.defaultValue,
    getRootNode: env.getRootNode,
    ...props,
  })

  const context: progress.Context = $derived({
    ...initialContext,
    value: props.value,
  })

  const [state, send] = useMachine(progress.machine(initialContext), { context })

  const api = $derived(() => progress.connect(state, send, normalizeProps))
  return api
}
