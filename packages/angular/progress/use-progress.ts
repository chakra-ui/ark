import * as progress from '@zag-js/progress'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseProgressProps extends OptionalId<Omit<progress.Props, 'dir' | 'getRootNode'>> {}

export type UseProgressReturn = UseMachineReturn<progress.Service['state'], progress.Api, progress.Service>

export interface UseProgressOptions {
  context: () => UseProgressProps
}

type ProgressSchema = progress.Machine extends Machine<infer TSchema> ? TSchema : never

export function useProgress(options: UseProgressOptions): UseProgressReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('progress')

  return useMachine<ProgressSchema, progress.Api>({
    machine: progress.machine,
    context: () => {
      const props = options.context()
      const context: Partial<ProgressSchema['props']> = {
        ...props,
        dir: locale.dir,
        id: props.id ?? fallbackId,
        locale: props.locale ?? locale.locale,
      }
      const getRootNode = environment.getRootNode as (() => ShadowRoot | Document | Node) | undefined
      if (getRootNode) {
        context.getRootNode = () => getRootNode()
      }
      return context
    },
    connect: (service, normalize) => progress.connect(service, normalize),
  })
}
