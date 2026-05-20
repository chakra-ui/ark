import * as toggleGroup from '@zag-js/toggle-group'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import type { ToggleGroupMachineProps } from './toggle-group.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseToggleGroupProps extends OptionalId<Omit<ToggleGroupMachineProps, 'dir' | 'getRootNode'>> {}

export type UseToggleGroupReturn = UseMachineReturn<toggleGroup.Service['state'], toggleGroup.Api, toggleGroup.Service>

export interface UseToggleGroupOptions {
  context: () => UseToggleGroupProps
}

type ToggleGroupSchema = toggleGroup.Machine extends Machine<infer TSchema> ? TSchema : never

export function useToggleGroup(options: UseToggleGroupOptions): UseToggleGroupReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('toggle-group')

  return useMachine<ToggleGroupSchema, toggleGroup.Api>({
    machine: toggleGroup.machine,
    context: () => {
      const props = options.context()
      return {
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        ...props,
        id: props.id ?? fallbackId,
      } as Partial<ToggleGroupSchema['props']>
    },
    connect: (service, normalize) => toggleGroup.connect(service, normalize),
  })
}
