import * as radio from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseRadioGroupProps extends Optional<Omit<radio.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseRadioGroupReturn extends radio.Api<PropTypes> {}

export const useRadioGroup = (props: UseRadioGroupProps = {}): UseRadioGroupReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const userProps: radio.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(radio.machine, userProps)
  return radio.connect(service, normalizeProps)
}
