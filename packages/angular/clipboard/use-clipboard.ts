import * as clipboard from '@zag-js/clipboard'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import type { ClipboardMachineProps } from './clipboard.types'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseClipboardProps extends OptionalId<Omit<ClipboardMachineProps, 'getRootNode'>> {}

export type UseClipboardReturn = UseMachineReturn<clipboard.Service['state'], clipboard.Api, clipboard.Service>

export interface UseClipboardOptions {
  context: () => UseClipboardProps
}

type ClipboardContext = Record<string, unknown>
type ClipboardSchema = clipboard.Machine extends Machine<infer TSchema> ? TSchema : never

export function useClipboard(options: UseClipboardOptions): UseClipboardReturn {
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('clipboard')

  return useMachine<ClipboardSchema, clipboard.Api>({
    machine: clipboard.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as ClipboardContext
    },
    connect: (service, normalize) => clipboard.connect(service, normalize),
  })
}
