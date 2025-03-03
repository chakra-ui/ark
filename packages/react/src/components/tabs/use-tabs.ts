import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as tabs from '@zag-js/tabs'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTabsProps extends Optional<Omit<tabs.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTabsReturn extends tabs.Api<PropTypes> {}

export const useTabs = (props: UseTabsProps = {}): UseTabsReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: tabs.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(tabs.machine, machineProps)
  return tabs.connect(service, normalizeProps)
}
