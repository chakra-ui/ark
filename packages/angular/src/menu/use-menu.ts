import * as menu from '@zag-js/menu'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseMenuProps extends OptionalId<Omit<menu.Props, 'dir' | 'getRootNode'>> {}

export type UseMenuReturn = UseMachineReturn<menu.Service['state'], menu.Api, menu.Service>

export interface UseMenuOptions {
  context: () => UseMenuProps
}

type MenuContext = Record<string, unknown>
type MenuSchema = menu.Machine extends Machine<infer TSchema> ? TSchema : never

export function useMenu(options: UseMenuOptions): UseMenuReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('menu')

  return useMachine<MenuSchema, menu.Api>({
    machine: menu.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as MenuContext
    },
    connect: (service, normalize) => menu.connect(service, normalize),
  })
}
