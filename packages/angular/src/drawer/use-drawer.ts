import * as drawer from '@zag-js/drawer'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { injectArkDrawerStackContextOptional } from './use-drawer-stack-context'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseDrawerProps extends OptionalId<Omit<drawer.Props, 'dir' | 'getRootNode'>> {}

export type UseDrawerReturn = UseMachineReturn<drawer.Service['state'], drawer.Api, drawer.Service>

export interface UseDrawerOptions {
  context: () => UseDrawerProps
}

type DrawerContext = Record<string, unknown>
type DrawerSchema = drawer.Machine extends Machine<infer TSchema> ? TSchema : never

export function useDrawer(options: UseDrawerOptions): UseDrawerReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const ancestorStack = injectArkDrawerStackContextOptional()
  const fallbackId = createArkId('drawer')

  return useMachine<DrawerSchema, drawer.Api>({
    machine: drawer.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
        stack: props.stack ?? ancestorStack?.stack,
      } as DrawerContext
    },
    connect: (service, normalize) => drawer.connect(service, normalize),
  })
}
