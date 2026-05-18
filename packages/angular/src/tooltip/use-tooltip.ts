import * as tooltip from '@zag-js/tooltip'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseTooltipProps extends OptionalId<Omit<tooltip.Props, 'dir' | 'getRootNode'>> {}

export type UseTooltipReturn = UseMachineReturn<tooltip.Service['state'], tooltip.Api, tooltip.Service>

export interface UseTooltipOptions {
  context: () => UseTooltipProps
}

type TooltipContext = Record<string, unknown>
type TooltipSchema = tooltip.Machine extends Machine<infer TSchema> ? TSchema : never

export function useTooltip(options: UseTooltipOptions): UseTooltipReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('tooltip')

  return useMachine<TooltipSchema, tooltip.Api>({
    machine: tooltip.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as TooltipContext
    },
    connect: (service, normalize) => tooltip.connect(service, normalize),
  })
}
