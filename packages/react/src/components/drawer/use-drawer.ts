import * as drawer from '@zag-js/drawer'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useDrawerStackStore } from './use-drawer-stack-store'

export interface UseDrawerProps extends Optional<Omit<drawer.Props, 'dir' | 'getRootNode' | 'defaultSnapPoint'>, 'id'> {
  defaultSnapPoint?: drawer.SnapPoint | undefined
}
export interface UseDrawerReturn extends drawer.Api<PropTypes> {}

export const useDrawer = (props?: UseDrawerProps): UseDrawerReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const stack = useDrawerStackStore()

  const context = {
    id,
    dir,
    getRootNode,
    stack,
    ...props,
  }

  const service = useMachine(drawer.machine, context as any)
  return drawer.connect(service, normalizeProps)
}
