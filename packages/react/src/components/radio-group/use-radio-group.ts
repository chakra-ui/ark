'use client'

import * as radio from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'
import { useFieldsetContext } from '../fieldset/index.ts'

export interface UseRadioGroupProps extends Optional<Omit<radio.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseRadioGroupReturn extends radio.Api<PropTypes> {}

export const useRadioGroup = (props?: UseRadioGroupProps): UseRadioGroupReturn => {
  const fieldset = useFieldsetContext()
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: radio.Props = {
    id,
    ids: {
      label: fieldset?.ids?.legend,
    },
    dir,
    disabled: fieldset?.disabled,
    invalid: fieldset?.invalid,
    getRootNode,
    ...props,
  }

  const service = useMachine(radio.machine, machineProps)
  return radio.connect(service, normalizeProps)
}
