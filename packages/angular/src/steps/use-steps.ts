import * as steps from '@zag-js/steps'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id?: string | undefined }> = Omit<T, 'id'> & { id?: string }

export interface UseStepsProps extends OptionalId<Omit<steps.Props, 'dir' | 'getRootNode'>> {}

export type UseStepsReturn = UseMachineReturn<steps.Service['state'], steps.Api, steps.Service>

export interface UseStepsOptions {
  context: () => UseStepsProps
}

type StepsContext = Record<string, unknown>
type StepsSchema = steps.Machine extends Machine<infer TSchema> ? TSchema : never

export function useSteps(options: UseStepsOptions): UseStepsReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('steps')

  return useMachine<StepsSchema, steps.Api>({
    machine: steps.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as StepsContext
    },
    connect: (service, normalize) => steps.connect(service, normalize),
  })
}
