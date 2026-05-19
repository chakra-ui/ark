import * as floatingPanel from '@zag-js/floating-panel'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseFloatingPanelProps extends OptionalId<Omit<floatingPanel.Props, 'dir' | 'getRootNode'>> {}

export type UseFloatingPanelReturn = UseMachineReturn<
  floatingPanel.Service['state'],
  floatingPanel.Api,
  floatingPanel.Service
>

export interface UseFloatingPanelOptions {
  context: () => UseFloatingPanelProps
}

type FloatingPanelContext = Record<string, unknown>
type FloatingPanelSchema = floatingPanel.Machine extends Machine<infer TSchema> ? TSchema : never

export function useFloatingPanel(options: UseFloatingPanelOptions): UseFloatingPanelReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('floating-panel')

  return useMachine<FloatingPanelSchema, floatingPanel.Api>({
    machine: floatingPanel.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as FloatingPanelContext
    },
    connect: (service, normalize) => floatingPanel.connect(service, normalize),
  })
}
