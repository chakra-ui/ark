import * as splitter from '@zag-js/splitter'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './splitter.types'

export interface UseSplitterProps
  extends Optional<Omit<splitter.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial size of the panels when it is first rendered.
   * Use this when you do not need to control the state of the carousel.
   */
  defaultSize?: splitter.Context['size']
}

export interface UseSplitterReturn extends ComputedRef<splitter.Api<PropTypes>> {}

export const useSplitter = (
  props: UseSplitterProps = {},
  emit?: EmitFn<RootEmits>,
): UseSplitterReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<splitter.Context>(() => ({
    id,
    dir: locale.value.dir,
    size: props.size ?? props.defaultSize,
    getRootNode: env?.value.getRootNode,
    onSizeChange: (details) => emit?.('sizeChange', details),
    onSizeChangeEnd: (details) => emit?.('sizeChangeEnd', details),
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(splitter.machine(context.value), { context })
  return computed(() => splitter.connect(state.value, send, normalizeProps))
}
