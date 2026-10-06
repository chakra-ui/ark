import { raf } from '@zag-js/dom-query'
import * as popover from '@zag-js/popover'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createEffect, createMemo, createUniqueId, on, onCleanup } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'

export interface UsePopoverProps extends Optional<Omit<popover.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePopoverReturn extends Accessor<popover.Api<PropTypes>> {}

export const usePopover = (props?: MaybeAccessor<UsePopoverProps>): UsePopoverReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<popover.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(popover.machine, machineProps)
  const api = createMemo(() => popover.connect(service, normalizeProps))

  createEffect(
    on(
      () => api().open,
      (open) => {
        if (!open) return
        const titleId = api().getTitleProps().id
        const descriptionId = api().getDescriptionProps().id
        onCleanup(
          raf(() => {
            service.context.set('renderedElements', {
              title: !!(titleId && service.scope.getById(titleId)),
              description: !!(descriptionId && service.scope.getById(descriptionId)),
            })
          }),
        )
      },
    ),
  )

  return api
}
