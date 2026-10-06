import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { raf } from '@zag-js/dom-query'
import * as popover from '@zag-js/popover'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UsePopoverProps extends Optional<Omit<popover.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UsePopoverReturn extends Accessor<popover.Api<PropTypes>> {}

export const usePopover = (props?: MaybeFunction<UsePopoverProps>): UsePopoverReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props) || {}
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(popover.machine, () => machineProps)
  const api = $derived(popover.connect(service, normalizeProps))
  const open = $derived(api.open)

  $effect(() => {
    if (!open) return
    return raf(() => {
      const titleId = api.getTitleProps().id
      const descriptionId = api.getDescriptionProps().id
      service.context.set('renderedElements', {
        title: !!(titleId && service.scope.getById(titleId)),
        description: !!(descriptionId && service.scope.getById(descriptionId)),
      })
    })
  })

  return () => api
}
