import * as accordion from '@zag-js/accordion'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId, mergeProps } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseAccordionProps
  extends Optional<Omit<accordion.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseAccordionReturn extends Accessor<accordion.Api<PropTypes>> {}

export const useAccordion = (props: UseAccordionProps): UseAccordionReturn => {
  const locale = useLocaleContext()
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), dir: locale().dir, getRootNode }, props)
  const [state, send] = useMachine(accordion.machine(context), { context })

  return createMemo(() => accordion.connect(state, send, normalizeProps))
}
