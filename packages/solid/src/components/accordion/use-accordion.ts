import * as accordion from '@zag-js/accordion'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseAccordionProps
  extends Optional<Omit<accordion.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the accordion when it is first rendered.
   * Use when you do not need to control the state of the color picker.
   */
  defaultValue?: accordion.Context['value']
}
export interface UseAccordionReturn extends Accessor<accordion.Api<PropTypes>> {}

export const useAccordion = (props: UseAccordionProps = {}): UseAccordionReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    value: props.defaultValue,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const [state, send] = useMachine(accordion.machine(context()), {
    context,
  })

  return createMemo(() => accordion.connect(state, send, normalizeProps))
}
