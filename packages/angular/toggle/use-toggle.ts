import * as toggle from '@zag-js/toggle'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import type { ToggleMachineProps } from './toggle.types'

export interface UseToggleProps extends ToggleMachineProps {}

export type UseToggleReturn = UseMachineReturn<toggle.Service['state'], toggle.Api, toggle.Service>

export interface UseToggleOptions {
  context: () => UseToggleProps
}

type ToggleContext = Record<string, unknown>
type ToggleSchema = toggle.Machine extends Machine<infer TSchema> ? TSchema : never

export function useToggle(options: UseToggleOptions): UseToggleReturn {
  return useMachine<ToggleSchema, toggle.Api>({
    machine: toggle.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
      } as ToggleContext
    },
    connect: (service, normalize) => toggle.connect(service, normalize),
  })
}
