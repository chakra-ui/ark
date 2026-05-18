import * as avatar from '@zag-js/avatar'
import { useMachine } from '@ark-ui/angular/src/_zag/use-machine'
import { createArkId } from '@ark-ui/angular/src/internal/id'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal/types'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseAvatarProps extends OptionalId<Omit<avatar.Props, 'dir' | 'getRootNode'>> {}

export type UseAvatarReturn = UseMachineReturn<avatar.Service['state'], avatar.Api, avatar.Service>

export interface UseAvatarOptions {
  context: () => UseAvatarProps
}

type AvatarContext = Record<string, unknown>

export function useAvatar(options: UseAvatarOptions): UseAvatarReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('avatar')

  return useMachine<AvatarContext, avatar.Service['state'], avatar.Api, avatar.Service>({
    machine: avatar.machine as unknown as { start: (context: AvatarContext) => avatar.Service },
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as AvatarContext
    },
    connect: (service, normalize) => avatar.connect(service, normalize as never),
  })
}
