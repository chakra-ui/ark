import * as popover from '@zag-js/popover'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UsePopoverProps extends OptionalId<Omit<popover.Props, 'dir' | 'getRootNode'>> {}

export type UsePopoverReturn = UseMachineReturn<popover.Service['state'], popover.Api, popover.Service>

export interface UsePopoverOptions {
  context: () => UsePopoverProps
}

type PopoverContext = Record<string, unknown>
type PopoverSchema = popover.Machine extends Machine<infer TSchema> ? TSchema : never

export function usePopover(options: UsePopoverOptions): UsePopoverReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('popover')

  return useMachine<PopoverSchema, popover.Api>({
    machine: popover.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as PopoverContext
    },
    connect: (service, normalize) => popover.connect(service, normalize),
  })
}
