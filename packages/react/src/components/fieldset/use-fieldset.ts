'use client'

import * as fieldset from '@zag-js/fieldset'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'

export interface UseFieldsetProps extends Optional<Omit<fieldset.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseFieldsetReturn extends fieldset.Api<PropTypes> {}

export const useFieldset = (props: UseFieldsetProps = {}): UseFieldsetReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: fieldset.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(fieldset.machine, machineProps)
  return fieldset.connect(service, normalizeProps)
}
