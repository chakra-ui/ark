'use client'

import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { Activity, useId, useRef } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'
import type { HideMode, RenderStrategyProps } from '../../utils/render-strategy.ts'

const supportsActivity = typeof Activity !== 'undefined'

export interface UseCollapsibleProps
  extends Optional<Omit<collapsible.Props, 'dir' | 'getRootNode'>, 'id'>, RenderStrategyProps {}

export interface UseCollapsibleReturn extends collapsible.Api<PropTypes> {
  /**
   * Whether the content is unmounted
   */
  isUnmounted?: boolean | undefined
  /**
   * Resolved hide strategy for mounted content.
   */
  hideMode: HideMode
}

export const useCollapsible = (props: UseCollapsibleProps = {}): UseCollapsibleReturn => {
  const { lazyMount, unmountOnExit, hideMode = 'display-none', ...collapsibleProps } = props
  const id = useId()
  const wasVisible = useRef(false)
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()

  const machineProps: collapsible.Props = {
    id,
    dir,
    getRootNode,
    ...collapsibleProps,
  }

  const service = useMachine(collapsible.machine, machineProps)
  const api = collapsible.connect(service, normalizeProps)

  if (api.visible) {
    wasVisible.current = true
  }

  const isUnmounted =
    (!api.visible && !wasVisible.current && lazyMount) || (unmountOnExit && !api.visible && wasVisible.current)

  const resolvedHideMode: HideMode = hideMode === 'activity' && supportsActivity ? 'activity' : 'display-none'

  return { ...api, isUnmounted, hideMode: resolvedHideMode }
}
