import * as splitter from '@zag-js/splitter'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './splitter.types'

export interface UseSplitterProps extends Optional<Omit<splitter.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseSplitterReturn extends ComputedRef<splitter.Api<PropTypes>> {}

export const useSplitter = (props: UseSplitterProps = {}, emit?: EmitFn<RootEmits>): UseSplitterReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<splitter.Props>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
    onSizeChange: (details) => {
      emit?.('sizeChange', details)
      emit?.('update:size', details.size)
      props.onSizeChange?.(details)
    },
    onSizeChangeEnd: (details) => {
      emit?.('sizeChangeEnd', details)
      props.onSizeChangeEnd?.(details)
    },
  }))

  const service = useMachine(splitter.machine, context)
  return computed(() => splitter.connect(service, normalizeProps))
}
