import type { Machine } from '@zag-js/core'
import * as timer from '@zag-js/timer'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseTimerProps extends OptionalId<Omit<timer.Props, 'dir' | 'getRootNode'>> {}

export type UseTimerReturn = UseMachineReturn<timer.Service['state'], timer.Api, timer.Service>

export interface UseTimerOptions {
  context: () => UseTimerProps
}

type TimerContext = Record<string, unknown>
type TimerSchema = timer.Machine extends Machine<infer TSchema> ? TSchema : never

export function useTimer(options: UseTimerOptions): UseTimerReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('timer')

  return useMachine<TimerSchema, timer.Api>({
    machine: timer.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as TimerContext
    },
    connect: (service, normalize) => timer.connect(service, normalize),
  })
}
