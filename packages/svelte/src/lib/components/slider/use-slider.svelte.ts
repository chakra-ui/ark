import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { createId } from '$lib/utils/create-id'
import * as slider from '@zag-js/slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'

export interface UseSliderProps
  extends Optional<Omit<slider.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the slider when it is first rendered.
   * Use when you do not need to control the state of the slider picker.
   */
  defaultValue?: slider.Context['value']
}

export interface UseSliderReturn extends Accessor<slider.Api<PropTypes>> {}

export const useSlider = (props: UseSliderProps = {}) => {
  const id = createId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const initialContext: slider.Context = $derived({
    id,
    dir: locale.dir,
    getRootNode: env.getRootNode,
    value: props.defaultValue,
    ...props,
  })

  const context: slider.Context = $derived({
    ...initialContext,
    value: props.value,
  })

  const [state, send] = useMachine(slider.machine(initialContext), {
    context,
  })

  const api = $derived(() => slider.connect(state, send, normalizeProps))
  return api
}
