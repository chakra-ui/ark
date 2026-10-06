'use client'

import { raf } from '@zag-js/dom-query'
import * as popover from '@zag-js/popover'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useEffect, useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'

export interface UsePopoverProps extends Optional<Omit<popover.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UsePopoverReturn extends popover.Api<PropTypes> {}

export const usePopover = (props?: UsePopoverProps): UsePopoverReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: popover.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(popover.machine, machineProps)
  const api = popover.connect(service, normalizeProps)

  const titleId = api.getTitleProps().id
  const descriptionId = api.getDescriptionProps().id

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-check only when the popover opens
  useEffect(() => {
    if (!api.open) return
    return raf(() => {
      service.context.set('renderedElements', {
        title: !!(titleId && service.scope.getById(titleId)),
        description: !!(descriptionId && service.scope.getById(descriptionId)),
      })
    })
  }, [api.open, titleId, descriptionId])

  return api
}
