import * as tabs from '@zag-js/tabs'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseTabsProps extends OptionalId<Omit<tabs.Props, 'dir' | 'getRootNode'>> {}

export type UseTabsReturn = UseMachineReturn<tabs.Service['state'], tabs.Api, tabs.Service>

export interface UseTabsOptions {
  context: () => UseTabsProps
}

type TabsContext = Record<string, unknown>
type TabsSchema = tabs.Machine extends Machine<infer TSchema> ? TSchema : never

export function useTabs(options: UseTabsOptions): UseTabsReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('tabs')

  return useMachine<TabsSchema, tabs.Api>({
    machine: tabs.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as TabsContext
    },
    connect: (service, normalize) => tabs.connect(service, normalize),
  })
}
