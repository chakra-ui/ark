'use client'

import * as numberFlow from '@zag-js/number-flow'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'

export interface UseNumberFlowProps extends Optional<Omit<numberFlow.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseNumberFlowReturn extends numberFlow.Api<PropTypes> {}

export const useNumberFlow = (props?: UseNumberFlowProps): UseNumberFlowReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir, locale } = useLocaleContext()

  const context: numberFlow.Props = {
    id,
    dir,
    locale,
    getRootNode,
    ...props,
  }

  const service = useMachine(numberFlow.machine, context)
  return numberFlow.connect(service, normalizeProps)
}
