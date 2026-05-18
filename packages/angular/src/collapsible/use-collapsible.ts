import * as collapsible from '@zag-js/collapsible'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseCollapsibleProps extends OptionalId<Omit<collapsible.Props, 'dir' | 'getRootNode'>> {}

export type UseCollapsibleReturn = UseMachineReturn<collapsible.Service['state'], collapsible.Api, collapsible.Service>

export interface UseCollapsibleOptions {
  context: () => UseCollapsibleProps
}

type CollapsibleContext = Record<string, unknown>
type CollapsibleSchema = collapsible.Machine extends Machine<infer TSchema> ? TSchema : never

export function useCollapsible(options: UseCollapsibleOptions): UseCollapsibleReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('collapsible')

  return useMachine<CollapsibleSchema, collapsible.Api>({
    machine: collapsible.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as CollapsibleContext
    },
    connect: (service, normalize) => collapsible.connect(service, normalize),
  })
}
