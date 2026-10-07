'use client'

import * as meter from '@zag-js/meter'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'

export interface UseMeterProps extends Optional<Omit<meter.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseMeterReturn extends meter.Api<PropTypes> {}

export const useMeter = (props?: UseMeterProps): UseMeterReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir, locale } = useLocaleContext()

  const machineProps: meter.Props = {
    id,
    dir,
    locale,
    getRootNode,
    ...props,
  }

  const service = useMachine(meter.machine, machineProps)
  return meter.connect(service, normalizeProps)
}
