import * as navigationMenu from '@zag-js/navigation-menu'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseNavigationMenuProps extends OptionalId<Omit<navigationMenu.Props, 'dir' | 'getRootNode'>> {}

export type UseNavigationMenuReturn = UseMachineReturn<
  navigationMenu.Service['state'],
  navigationMenu.Api,
  navigationMenu.Service
>

export interface UseNavigationMenuOptions {
  context: () => UseNavigationMenuProps
}

type NavigationMenuContext = Record<string, unknown>
type NavigationMenuSchema = navigationMenu.Machine extends Machine<infer TSchema> ? TSchema : never

export function useNavigationMenu(options: UseNavigationMenuOptions): UseNavigationMenuReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('navigation-menu')

  return useMachine<NavigationMenuSchema, navigationMenu.Api>({
    machine: navigationMenu.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as NavigationMenuContext
    },
    connect: (service, normalize) => navigationMenu.connect(service, normalize),
  })
}
