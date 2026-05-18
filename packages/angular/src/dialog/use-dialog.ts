import * as dialog from '@zag-js/dialog'
import type { Machine } from '@zag-js/core'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string }

export interface UseDialogProps extends OptionalId<Omit<dialog.Props, 'dir' | 'getRootNode'>> {}

export type UseDialogReturn = UseMachineReturn<dialog.Service['state'], dialog.Api, dialog.Service>

export interface UseDialogOptions {
  context: () => UseDialogProps
}

type DialogContext = Record<string, unknown>
type DialogSchema = dialog.Machine extends Machine<infer TSchema> ? TSchema : never

export function useDialog(options: UseDialogOptions): UseDialogReturn {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('dialog')

  return useMachine<DialogSchema, dialog.Api>({
    machine: dialog.machine,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as DialogContext
    },
    connect: (service, normalize) => dialog.connect(service, normalize),
  })
}
