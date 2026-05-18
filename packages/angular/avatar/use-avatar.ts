import * as avatar from '@zag-js/avatar'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseAvatarProps extends OptionalId<Omit<avatar.Props, 'dir' | 'getRootNode'>> {}

export type UseAvatarReturn = UseMachineReturn<avatar.Service['state'], avatar.Api, avatar.Service>

export interface UseAvatarOptions {
  context: () => UseAvatarProps
}

type AvatarContext = Record<string, unknown>
type AvatarSchema = avatar.Machine extends Machine<infer TSchema> ? TSchema : never

export function useAvatar(options: UseAvatarOptions): UseAvatarReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('avatar')

  return useMachine<AvatarSchema, avatar.Api>({
    machine: avatar.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as AvatarContext
    },
    connect: (service, normalize) => avatar.connect(service, normalize),
  })
}
