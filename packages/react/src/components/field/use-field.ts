'use client'

import * as field from '@zag-js/field'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'
import { useFieldsetContext } from '../fieldset/use-fieldset-context.ts'

export interface UseFieldProps extends Optional<Omit<field.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseFieldReturn extends field.Api<PropTypes> {}

export const useField = (props: UseFieldProps = {}): UseFieldReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const fieldset = useFieldsetContext()

  const machineProps: field.Props = {
    id,
    dir,
    getRootNode,
    disabled: fieldset?.disabled,
    ...props,
  }

  const service = useMachine(field.machine, machineProps)
  return field.connect(service, normalizeProps)
}
