import * as hoverCard from '@zag-js/hover-card'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseHoverCardProps extends OptionalId<Omit<hoverCard.Props, 'dir' | 'getRootNode'>> {}

export type UseHoverCardReturn = UseMachineReturn<hoverCard.Service['state'], hoverCard.Api, hoverCard.Service>

export interface UseHoverCardOptions {
  context: () => UseHoverCardProps
}

type HoverCardContext = Record<string, unknown>
type HoverCardSchema = hoverCard.Machine extends Machine<infer TSchema> ? TSchema : never

export function useHoverCard(options: UseHoverCardOptions): UseHoverCardReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('hover-card')

  return useMachine<HoverCardSchema, hoverCard.Api>({
    machine: hoverCard.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as HoverCardContext
    },
    connect: (service, normalize) => hoverCard.connect(service, normalize),
  })
}
